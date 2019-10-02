var safeCompose = require('./index')

var head = xs => xs[0]
var last = xs => xs[xs.length - 1]
var toUpper = x => x.toUpperCase()
var trim = x => x.trim()

test('does not crash on undefined', () => {
  expect(safeCompose(trim, toUpper, head)(undefined)).toBe(undefined)
})

test('does not crash on null', () => {
  expect(safeCompose(trim, toUpper, head)(null)).toBe(undefined)
})

test('takes non function value on error', () => {
  expect(safeCompose(['default'], last)(undefined)).toEqual(['default'])
})

test('does not crash on last fn when error has occurred', () => {
  expect(safeCompose(head, last)(undefined)).toBe(undefined)
})

test('returns the output of last fn when error has occurred', () => {
  expect(
    safeCompose(function () {
      return 'lol'
    }, last)(undefined)
  ).toBe('lol')
})

test('does not crash when last fn throws', () => {
  expect(
    safeCompose(function () {
      throw new Error()
    }, last)(undefined)
  ).toBe(undefined)
})

test('returns undefined when no arguments are passed', () => {
  expect(safeCompose()()).toBe(undefined)
})
