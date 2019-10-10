var safeCompose = require('./index')

var head = function (xs) {
  return xs[0]
}

var toUpper = function (x) {
  return x.toUpperCase()
}

var trim = function (x) {
  return x.trim()
}

test('a successful composition works as expected', function () {
  expect(safeCompose(trim, toUpper, head)(['  lorem'])).toBe('LOREM')
})

test('does not crash on undefined', function () {
  expect(safeCompose(trim, toUpper, head)(undefined)).toBe(undefined)
})

test('does not crash on null', function () {
  expect(safeCompose(trim, toUpper, head)(null)).toBe(undefined)
})

test('returns non-function value if there is only one argument', function () {
  expect(safeCompose('fallback')('lorem')).toBe('fallback')
})

test('returns non-function value if there is only one argument and no data', function () {
  expect(safeCompose('fallback')()).toBe('fallback')
})

test('takes non-function value on error', function () {
  expect(safeCompose('fallback', trim, toUpper, head)(undefined)).toBe(
    'fallback'
  )
})

test('returns the output of last fn when error has occurred', function () {
  expect(
    safeCompose(
      function () {
        return 'fallback'
      },
      trim,
      toUpper,
      head
    )(undefined)
  ).toBe('fallback')
})

test('does not crash when last fn throws', function () {
  expect(
    safeCompose(
      function () {
        throw new Error()
      },
      trim,
      toUpper,
      head
    )(undefined)
  ).toBe(undefined)
})

test('returns undefined when no arguments are passed', function () {
  expect(safeCompose()()).toBe(undefined)
})

test('can recover from error', function () {
  expect(
    safeCompose(
      trim,
      toUpper,
      function (x) {
        return x || '  fallback'
      },
      head
    )(undefined)
  ).toBe('FALLBACK')
})
