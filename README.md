# safeCompose

Create robust function compositions worrilessly

[![npm (tag)](https://img.shields.io/npm/v/safe-compose/latest?style=for-the-badge)](https://www.npmjs.com/package/safe-compose)

## Why safeCompose

To cover all the possible paths and shapes data can take in a composition is an unnecessary cognitive load. With `safeCompose` we only have to think about our happy path.

## Installation

`npm install safe-compose`

## Usage

Import the function

```js
import safeCompose from 'safe-compose'
```

I think the best way to explain how `safeCompose` works is by going through a few examples.

In the example below we run our composition with `undefined`. The first function to receive our data is `head`, and it has no clue what to do with `undefined`, so it just throws an error, but do not fret – `safeCompose` uses try/catch for all function calls in the composition. `safeCompose` has an `output` variable which will be assigned either the the output of the current function or `undefined` in case the function throws. In this case all our functions will fail, so the return value of the composition is `undefined`.

```js
const head = xs => xs[0]
const toUpper x => x.toUpperCase()
const trim = x => x.trim()

safeCompose(
  trim, // output = undefined
  toUpper, // output = undefined
  head // output = undefined
)(undefined) // => undefined
```

To provide a fallback you can use a function that returns the fallback value if a condition isn't met.

```js
safeCompose(
  x => typeof x === 'string' ? x : 'FALLBACK'
  trim, // output = undefined
  toUpper, // output = undefined
  head // output = undefined
)(undefined) // => 'FALLBACK'
```

To recover from a failure mid-composition you can do something like this:

```js
safeCompose(
  trim, // output = 'FALLBACK'
  toUpper, // output = '  FALLBACK'
  x => x || '  fallback', // output = '  fallback'
  head // output = undefined
)(undefined) // => 'FALLBACK'
```

You can also use a non-function value. Note that only the first argument can be a non-function value.

```js
safeCompose(
  'FALLBACK'
  trim, // output = undefined
  toUpper, // output = undefined
  head // output = undefined
)(undefined) // => 'FALLBACK'
```

## Performance

`safeCompose` is very fast since we don't need to check input values in the composition. If you'd like to see some numbers you can check out the [Stackblitz page](https://stackblitz.com/edit/safe-compose). To see the results you have to open your browsers console.
