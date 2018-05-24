const svgson = require('svgson-next').default
const { renderToStaticMarkup } = require('react-dom/server')
const { createElement: e } = require('react')
const pretty = require('pretty')
const Element = require('./createElement')

const svgoDefaultConfig = {
  plugins: [
    { removeStyleElement: true },
    { removeScriptElement: true },
    { removeViewBox: false },
    {
      removeAttrs: {
        attrs: [
          '(class|style)',
          'svg:width',
          'svg:height',
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
  return svgson(data, svgsonConfig)
}
const replaceTag = icon => ({ ...icon, name: 'symbol' })
const createIcon = (obj, key) => e(Element, { obj, key })
const createSprite = icons => {
  return e('svg', { width: 0, height: 0, className: 'hidden' }, icons)
}
const getId = obj => obj['data-iconid']
const createRef = (id, className) => {
  return e(
    'svg',
    { className: className !== '' ? className : null },
    e('use', { xlinkHref: `#${id}` })
  )
}
const markup = elem => renderToStaticMarkup(elem)

const generateSprite = (result, { tidy, className }) => {
  const multiResult = Array.isArray(result)
  const icons = multiResult
    ? result.map(replaceTag).map(createIcon)
    : createIcon(replaceTag(result))
  const refs = multiResult
    ? result.map(getId).map(id => createRef(id, className))
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

module.exports = (
  input,
  {
    tidy = false,
    optimize = true,
    svgoConfig = svgoDefaultConfig,
    processId = n => `Icon_${n}`,
    className = '',
  } = {}
) => {
  let n = 0
  const transformNode = node => {
    if (node.name === 'svg') {
      const id = processId(n++)
      return {
        ...node,
        attributes: {
          ...node.attributes,
          id,
        },
        'data-iconid': id,
      }
    }
    return node
  }
  return processWithSvgson(input, { optimize, svgoConfig, transformNode }).then(
    res => generateSprite(res, { tidy, className })
  )
}
