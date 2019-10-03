# safe-compose
Create function compositions without worry

[![npm (tag)](https://img.shields.io/npm/v/safe-compose/latest?style=for-the-badge)](https://www.npmjs.com/package/safe-compose)

## Motivation behind safe-compose

Very often our composed functions end up looking something like this:

```js
// import {...} from ramda/ramda-adjunct

const data = [
  [[{ x: false }]],
  [[{ x: false }, { x: true, y: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'] }]]
]

compose(
  ifElse(both(isNonEmptyArray, all(isNonEmptyString)), identity, always(['fallback'])),
  take(3),
  propOr([], 'y'),
  ifElse(both(isNonEmptyArray, all(isObject)), find(prop('x')), always({})),
  ifElse(isNonEmptyArray, head, F),
  ifElse(isNonEmptyArray, last, F)
)(data)
```

Having to code defensively like this is a huge cognitive load. With `safe-compose` we can create our happy path in peace knowing that our program won't crash if any function throws an error. With `safe-compose` the composition above can be written like this:

```js
safeCompose(
  unless(both(isNonEmptyArray, all(isNonEmptyString)), always(['fallback'])),
  take(3),
  prop('y'),
  find(prop('x')),
  head,
  last
)(data)
```

## Installation

`npm install safe-compose`

## Usage examples

If the first argument is a non function value it will be used as the return value if the composition fails.

```js
safeCompose(1337, add(1), multiply(3), divide(3), subtract(7))(NaN)
```

With JSON.parse.

```js
safeCompose(
  { fallback: 'fallback' },
  assoc('lorem', 'lorem'),
  dissoc('ipsum'),
  JSON.parse
)('{"ipsum": "ips')
```
