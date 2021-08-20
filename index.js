const { parse } = require('svgson')
const { renderToStaticMarkup } = require('react-dom/server')
const { createElement: e } = require('react')
const pretty = require('pretty')
const Element = require('./createElement')
const { optimize: optimizeSVG } = require('svgo')

const svgoDefaultConfig = {
  plugins: [
    { name: 'removeStyleElement', active: true },
    { name: 'removeScriptElement', active: true },
    { name: 'removeViewBox', active: false },
    { name: 'removeTitle', active: false },
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          '(class|style)',
          'xlink:href',
          'aria-labelledby',
          'aria-describedby',
          'xmlns:xlink',
          'data-name',
        ],
      },
    },
  ],
  multipass: true,
}

const processWithSvgson = (data, { optimize, svgoConfig, transformNode }) => {
  const svgsonConfig = {
    optimize,
    camelcase: true,
    transformNode,
    svgoConfig,
  }
  return parse(data, svgsonConfig)
}
const replaceTag = (icon) => ({ ...icon, name: 'symbol' })
const createIcon = (obj, key) => e(Element, { obj, key })
const createSprite = (icons) => {
  return e('svg', { width: 0, height: 0, className: 'hidden' }, icons)
}
const getId = (obj) => obj['data-iconid']
const createRef = (id, className) => {
  return e(
    'svg',
    { className: className !== '' ? className : null },
    e('use', { xlinkHref: `#${id}` })
  )
}
const markup = (elem) => renderToStaticMarkup(elem)

const generateSprite = (result, { tidy, className }) => {
  const multiResult = Array.isArray(result)
  const icons = multiResult
    ? result.map(replaceTag).map(createIcon)
    : createIcon(replaceTag(result))
  const refs = multiResult
    ? result.map(getId).map((id) => createRef(id, className))
    : createRef(getId(result), className)
  const sprite = createSprite(icons)
  const spriteOutput = markup(sprite)
  const refsOutput = markup(refs)
  const spriteDefs = tidy ? pretty(spriteOutput) : spriteOutput
  const spriteRefs = tidy ? pretty(refsOutput) : refsOutput
  return {
    defs: spriteDefs,
    refs: spriteRefs,
  }
}

module.exports = async (
  input,
  {
    tidy = false,
    optimize = true,
    svgoConfig = svgoDefaultConfig,
    processId = (n) => `Icon_${n}`,
    className = '',
  } = {}
) => {
  let n = 0

  const transformNode = (node) => {
    if (Array.isArray(node)) {
      return node.map(transformNode)
    } else {
      if (node.name === 'svg') {
        const id = processId(n++)
        const { viewBox, width, height, ...extra } = node.attributes
        let defViewBox = viewBox || `0 0 ${width} ${height}`
        return {
          ...node,
          attributes: {
            ...extra,
            viewBox: defViewBox,
            id,
          },
          'data-iconid': id,
        }
      }
      return node
    }
  }

  let icons = []
  let optimized = []
  if (optimize) {
    try {
      for (const icon of input) {
        const iconOpt = optimizeSVG(icon, svgoConfig)
        optimized.push(iconOpt.data)
      }
      icons = optimized
    } catch (err) {
      // console.log({ err })
    }
  } else {
    icons = input
  }

  icons = icons.join(' ')

  const processed = await processWithSvgson(icons, {
    transformNode,
  })

  return await generateSprite(processed, { tidy, className })
}
