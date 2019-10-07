# safeCompose

Create robust function compositions worrilessly

[![npm (tag)](https://img.shields.io/npm/v/safe-compose/latest?style=for-the-badge)](https://www.npmjs.com/package/safe-compose)

## What safeCompose does

What `safeCompose` does is that it uses try/catch for all function calls in the composition. It also gives you the option to provide a fallback value in case any function throws.

## Motivation behind safeCompose

Quite often our composed functions end up looking something like this:

```js
// import {...} from ramda/ramda-adjunct

const data = [
  [[{ x: false }]],
  [[{ x: false }, { x: true, y: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'] }]]
]

compose(
  unless(both(isNonEmptyArray, all(isNonEmptyString)), always(['fallback'])),
  take(3),
  propOr([], 'y'),
  ifElse(both(isNonEmptyArray, all(isObject)), find(prop('x')), always({})),
  ifElse(isNonEmptyArray, head, F),
  ifElse(isNonEmptyArray, last, F)
)(data) // => ['lorem', 'ipsum', 'dolor']
```

Having to code defensively like this is an unnecessary cognitive load. With `safeCompose` we only need to think about our happy path:

```js
safeCompose(
  unless(both(isNonEmptyArray, all(isNonEmptyString)), always(['fallback'])),
  take(3),
  prop('y'),
  find(prop('x')),
  head,
  last
)(data) // => ['lorem', 'ipsum', 'dolor']
```

## Installation

`npm install safe-compose`

## Usage

Import the function.

```js
import safeCompose from 'safe-compose'
```

In the example below `head` will throw, which will cause `safeCompose` to skip to the last function and call it with `undefined`(some functions return themselves given no arguments). In this case the last function returns `'FALLBACK'` given anything except a non-empty string.

```js
safeCompose(
  unless(isNonEmptyString, always('FALLBACK')),
  trim,
  toUpper,
  head
)(undefined) // => 'FALLBACK'
```

If the first argument is a non-function value it will be used as the fallback value.

```js
safeCompose(
  'FALLBACK',
  trim,
  toUpper,
  head
)(undefined) // => 'FALLBACK'
```

An example with `JSON.parse`.

```js
safeCompose(
  { fallback: 'fallback' },
  assoc('lorem', 'lorem'),
  dissoc('ipsum'),
  JSON.parse
)('{"ipsum": "ips') // => { fallback: 'fallback' }
```

## Performance

`safeCompose` is very fast since we don't need to check input values in the pipe. If you'd like to see some numbers you can check out the [Stackblitz page](https://stackblitz.com/edit/safe-compose). To see the results you have to open your browsers console.
