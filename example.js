const fs = require('fs')
const { promisify } = require('util')
const { extname, resolve } = require('path')

const svgSpreact = require('./index')

const readFileAsync = promisify(fs.readFile)
const readdirAsync = promisify(fs.readdir)

const readFolder = async folder => {
  let svgsString = ''
  const files = await readdirAsync(folder)
  const filtered = files.filter(file => extname(file) === '.svg')
  const filenames = filtered.map(file => file.replace('.svg', ''))
  for (file of filtered) {
    const data = await readFileAsync(resolve(folder, file))
    svgsString = `${svgsString}${data.toString()}`
  }
  return Promise.resolve({ svgsString, filenames })
}

const doSprite = ({ svgsString, filenames }) => {
  const processId = n => `___icon___${filenames[n]}`
  return svgSpreact(svgsString, { tidy: true, processId })
}

readFolder('./icons')
  .then(doSprite)
  .then(({ defs, refs }) => {
    console.log(defs)
    console.log(refs)
  })
