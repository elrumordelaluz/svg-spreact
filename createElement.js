const { createElement } = require('react')

const doElem = (obj, index) => {
  let childnodes

  if (obj.children) {
    const { children } = obj
    childnodes = Array.isArray(children)
      ? children.map((node, index) => {
          if (node.type === 'element') {
            return doElem(node, index)
          } else if (node.type == 'text') {
            return node.data
          }
        })
      : children
  }

  return createElement(
    obj.name,
    { ...obj.attributes, key: index ? index : null },
    childnodes
  )
}

const Element = ({ obj }) => doElem(obj, null)

module.exports = Element
