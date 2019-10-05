# safeCompose
Create function compositions without worry

[![npm (tag)](https://img.shields.io/npm/v/safe-compose/latest?style=for-the-badge)](https://www.npmjs.com/package/safe-compose)

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

Having to code defensively like this adds an unnecessary cognitive load. With `safeCompose` we only need to think about our happy path:

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

If the composition fails the return value will be the output of the last function, which will be called with `undefined` as its argument since some functions return themselves when given no arguments.

In the example below `head` will throw so we jump to the last function which given anything except a non-empty string will return `'FALLBACK'`.

```js
safeCompose(
  unless(isNonEmptyString, always('FALLBACK')),
  trim,
  toUpper,
  head
)(undefined) // => 'FALLBACK'
```

If the first argument is a non-function value it will be used as the return value if the composition fails.

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

`safeCompose` is much faster than the Ramda alternative since we don't need to check our input on each step in the pipe, and if any of the functions throws we immediately skip to the last function. If you'd like to see some numbers you can check out the [Stackblitz page](https://stackblitz.com/edit/safe-compose). To see the results you have to open your browsers console.
