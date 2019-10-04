var safeCompose = require('./index')

var head = function (xs) { return xs[0] }
var last = function (xs) { return xs[xs.length - 1] }
var toUpper = function (x) { return x.toUpperCase() }
var trim = function (x) { return x.trim() }

test('does not crash on undefined', function () {
  expect(safeCompose(trim, toUpper, head)(undefined)).toBe(undefined)
})

test('does not crash on null', function () {
  expect(safeCompose(trim, toUpper, head)(null)).toBe(undefined)
})

test('takes non function value on error', function () {
  expect(safeCompose(['default'], last)(undefined)).toEqual(['default'])
})

test('does not crash on last fn when error has occurred', function () {
  expect(safeCompose(head, last)(undefined)).toBe(undefined)
})

test('returns the output of last fn when error has occurred', function () {
  expect(
    safeCompose(function () {
      return 'lol'
    }, last)(undefined)
  ).toBe('lol')
})

test('does not crash when last fn throws', function () {
  expect(
    safeCompose(function () {
      throw new Error()
    }, last)(undefined)
  ).toBe(undefined)
})

test('returns undefined when no arguments are passed', function () {
  expect(safeCompose()()).toBe(undefined)
})
