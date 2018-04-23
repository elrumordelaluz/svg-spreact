# svg-spreact

<p align="center">
  Create an <em>SVG Sprites</em> using <a href="https://github.com/elrumordelaluz/svgson-next">svgson</a> and <a href="https://reactjs.org/">react</a>
</p>

🚧 just a draft idea

## Install

```zsh
yarn add svg-spreact
```

## Usage

```
const doSprite = require('svg-spreact')

const icons = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Add</title>
  <path data-name="layer1"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M32 16v32m16-16H16"
  stroke-linejoin="round" stroke-linecap="round"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Checkmark</title>
  <path data-name="layer1"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M16 33l11 11 21-22"
  stroke-linejoin="round" stroke-linecap="round"></path>
</svg>
`

doSprite(icons).then(({ defs, refs }) => {
  console.log(defs) // <symbol>
  console.log(refs) // <use>
})
```

## API

doSprite(input, [options])

#### input

Type: `string`

#### options

Type: `Object`

* `tidy` output prettyfied (`Boolean`) default: `true`
* `optimize` output optimizde with [svgo](https://github.com/svg/svgo/) (`Boolean`) default: `true`
* `svgoConfig` _SVGO_ plugins configuration (`Object`) [default](https://github.com/elrumordelaluz/svg-spreact/blob/master/index.js#L25-L45)
* `processIds` way to customize _Icons_ `id`s (`Function`) [default](https://github.com/elrumordelaluz/svg-spreact/blob/master/index.js#L10-L23)

## Example

Take a look into [this example](https://github.com/elrumordelaluz/svg-spreact/blob/master/example.js) reading a folder with _Icons_
