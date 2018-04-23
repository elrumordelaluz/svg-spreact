const svgson = require('svgson-next').default
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')
const pretty = require('pretty')
const Element = require('./createElement')

const e = React.createElement

let n = 1

const transformNode = node => {
  if (node.name === 'svg') {
    const id = `icon_${n++}`
    return {
      ...node,
      attribs: {
        ...node.attribs,
        id,
      },
      'data-iconid': id,
    }
  }
  return node
}

const svgsonCongig = {
  optimize: true,
  camelcase: true,
  transformNode,
  svgoConfig: {
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
  },
}

const processWithSvgson = data => svgson(data, svgsonCongig)
const replaceTag = icon => ({ ...icon, name: 'symbol' })
const createIcon = (obj, key) => e(Element, { obj, key })
const createSprite = icons => {
  return e('svg', { width: 0, height: 0, className: 'hidden' }, icons)
}
const getId = obj => obj['data-iconid']
const createRef = id => e('svg', {}, e('use', { xlinkHref: `#${id}` }))
const markup = elem => renderToStaticMarkup(elem)

const generateSprite = (result, tidy) => {
  const icons = result.map(replaceTag).map(createIcon)
  const refs = result.map(getId).map(createRef)
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

module.exports = (input, { tidy = true }) => {
  return processWithSvgson(input).then(res => generateSprite(res, tidy))
}
