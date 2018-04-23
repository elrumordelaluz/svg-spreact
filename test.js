const fs = require('fs')
const { promisify } = require('util')
const { extname, resolve } = require('path')

const svgSpreact = require('./index')

const readFileAsync = promisify(fs.readFile)
const readdirAsync = promisify(fs.readdir)

const readFolder = async folder => {
  let svgString = ''
  const files = await readdirAsync(folder)
  const filtered = files.filter(file => extname(file) === '.svg')
  for (file of filtered) {
    const data = await readFileAsync(resolve(folder, file))
    svgString = `${svgString}${data.toString()}`
  }
  return Promise.resolve(svgString)
}

readFolder('./icons')
  .then(input => svgSpreact(input, { tidy: true }))
  .then(({ defs, refs }) => {
    console.log(defs)
    console.log(refs)
  })
