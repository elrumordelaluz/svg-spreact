import test from 'ava'
import path from 'path'
import fs from 'fs'
import doSprite from './'

const src = `
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

const expectedDefs = `<svg width="0" height="0" class="hidden"><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" id="icon_1"><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M32 16v32m16-16H16" stroke-linejoin="round" stroke-linecap="round"></path></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" id="icon_2"><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M16 33l11 11 21-22" stroke-linejoin="round" stroke-linecap="round"></path></symbol></svg>`
const expectedRefs = `<svg><use xlink:href="#icon_1"></use></svg><svg><use xlink:href="#icon_2"></use></svg>`

test('Create SVG Sprite from string', async t => {
  const { defs, refs } = await doSprite(src)
  t.is(defs, expectedDefs)
  t.is(refs, expectedRefs)
})
