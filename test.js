import test from 'ava'
import path from 'path'
import fs from 'fs'
import doSprite from './'

const src_multi = `
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

const src_single = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Add</title>
  <path data-name="layer1"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M32 16v32m16-16H16"
  stroke-linejoin="round" stroke-linecap="round"></path>
</svg>
`

const expected_defs_multi = `<svg width="0" height="0" class="hidden"><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" id="Icon_0"><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M32 16v32m16-16H16" stroke-linejoin="round" stroke-linecap="round"></path></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" id="Icon_1"><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M16 33l11 11 21-22" stroke-linejoin="round" stroke-linecap="round"></path></symbol></svg>`
const expected_refs_multi = `<svg><use xlink:href="#Icon_0"></use></svg><svg><use xlink:href="#Icon_1"></use></svg>`

const expected_defs_single = `<svg width="0" height="0" class="hidden"><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" id="Icon_0"><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M32 16v32m16-16H16" stroke-linejoin="round" stroke-linecap="round"></path></symbol></svg>`
const expected_refs_single = `<svg><use xlink:href="#Icon_0"></use></svg>`

test('Create SVG Sprite from string of multiple SVGs', async t => {
  const { defs, refs } = await doSprite(src_multi)
  t.is(defs, expected_defs_multi)
  t.is(refs, expected_refs_multi)
})

test('Create SVG Sprite from string of single SVG', async t => {
  const { defs, refs } = await doSprite(src_single)
  t.is(defs, expected_defs_single)
  t.is(refs, expected_refs_single)
})
