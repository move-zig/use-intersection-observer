# generic-result-type

A small, dependency free Result type for TypeScript and JavaScript.

It provides a simple way to represent success or failure values without throwing exceptions.

## Installation

```sh
npm i generic-result-type
```

## Module support

This package supports **both ESM and CommonJS** out of the box.

ESM:

```ts
import { success, failure, type Result } from 'generic-result-type';
```

CommonJS:

```js
const { success, failure } = require('generic-result-type');
```

TypeScript typings are included.

## No dependencies

This package has zero runtime dependencies.
It does not rely on any external libraries.

## Usage

Create results using the `success` and `failure` functions, then narrow them with the provided type guards.

### Example function

```ts
const parseNumber = (input: string): Result<number> => {
  const value = Number(input);

  if (Number.isNaN(value)) {
    return failure(Error('Not a number'));
  }

  return success(value);
}
```

### Handling results

Use the type guard helpers to safely branch on the result type.

```ts
const result = getSomeValue();

if (isErrorResult(result)) { // or if (result.success === false)
  console.error('Error:', result.error.message);
  return;
}

console.log('Value:', result.value);
```

TypeScript will correctly narrow the type inside each branch without casting.

### Mapping

You can map the value or the error of a Result with these methods:

* map
* mapErr
* mapAsync
* mapErrAsync

```ts
const numberResult = getSomeNumberResult().map(x => x * 2);

const responseResult = await getSomeStringResult().mapAsync(async x => fetch(x));
```

## License

ISC