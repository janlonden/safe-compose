var safeCompose = require('./index')

var head = function (xs) { return xs[0] }
var last = function (xs) { return xs[xs.length - 1] }
var toUpper = function (x) { return x.toUpperCase() }
var trim = function (x) { return x.trim() }

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
