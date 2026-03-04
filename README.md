# @davewelsh79/use-intersection-observer

A small, dependency-free library of intersection observer hooks

It provides a simple way to observe elements and check their isIntersected state

## Installation

```sh
npm i @davewelsh79/use-intersection-observer
```

## Module support

This package supports **both ESM and CommonJS** out of the box.

ESM:

```ts
import { useIntersectionObserver } from '@davewelsh79/use-intersection-observer';
```

CommonJS:

```js
const { useIntersectionObserver } = require('@davewelsh79/use-intersection-observer');
```

TypeScript typings are included.

## No dependencies

This package has zero runtime dependencies.
It does not rely on any external libraries.

## Usage

```tsx
import type { FC } from 'react';
import { useIntersectionObserver } from '@davewelsh79/use-intersection-observer';

export const MyComponent: FC = () => {
  const [ isIntersected, ref ] = useIntersectionObserver();

  return <div ref="ref">{isIntersected ? 'true' : 'false'}</div>;
};
```

## License

ISC