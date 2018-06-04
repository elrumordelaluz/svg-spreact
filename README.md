<p align="center">
  <img alt="SVG Spreact" title="SVG Spreact" src="https://cdn.rawgit.com/elrumordelaluz/svg-spreact/2b58118b/logo.svg" width="450">
</p>

<p align="center">
  Create an <em>SVG Sprites</em> using <a href="https://github.com/elrumordelaluz/svgson-next">svgson</a> and <a href="https://reactjs.org/">react</a>
</p>

## Install

```zsh
yarn add svg-spreact
```

## Usage

```
const svgSpreact = require('svg-spreact')

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

svgSpreact(icons).then(({ defs, refs }) => {
  console.log(defs) // <symbol>
  console.log(refs) // <use>
})
```

## API

svgSpreact(input, [options])

#### input

Type: `Array`

#### options

Type: `Object`

- `tidy` output prettyfied (`Boolean`) default: `true`
- `optimize` output optimizde with [svgo](https://github.com/svg/svgo/) (`Boolean`) default: `true`
- `svgoConfig` _SVGO_ plugins configuration (`Object`) [default](https://github.com/elrumordelaluz/svg-spreact/blob/master/index.js#L25-L45)
- `processId` function for customize _Icons_ `id`s (`Function`) default: `(n) => 'Icon_' + n`
- `className` classname/s to add on each `<use>` element (`String`) default: ''

## Example

Take a look into [this example](https://github.com/elrumordelaluz/svg-spreact/blob/master/example.js) reading a folder with _Icons_

## Related

[svg-spreact-cli](https://github.com/elrumordelaluz/svg-spreact-cli) CLI version

[web-app](https://elrumordelaluz.github.io/micro-svg-spreact/)

`[POST]` [endpoint](https://micro-svg-spreact.now.sh/) | [docs](https://github.com/elrumordelaluz/micro-svg-spreact)
