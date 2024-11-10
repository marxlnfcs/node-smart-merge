<p align="center" style="font-size: 40px;">Smart Merge</p>

<p align="center">A simple library for merging objects and arrays</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@marxlnfcs/smart-merge" target="_blank"><img src="https://img.shields.io/npm/v/@marxlnfcs/smart-merge.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/smart-merge" target="_blank"><img src="https://img.shields.io/npm/l/@marxlnfcs/smart-merge.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/smart-merge" target="_blank"><img src="https://img.shields.io/npm/dm/@marxlnfcs/smart-merge.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/smart-merge" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@marxlnfcs/smart-merge?label=size" alt="Package Size" /></a>
</p>

## Installation
```
npm i @marxlnfcs/smart-merge
```

## Usage
```typescript
import { smartMerge } from '@marxlnfcs/smart-merge';

// objects
const objectA: any = { ... };
const objectB: any = { ... };

// merge both objects into one
const objectC = smartMerge(objectA, objectB, {
  matchSimilarKeys: false,
  cloneObject: true,
  prioritizedKeys: [
    ['apiVersion', 'kind', 'metadata.name', 'metadata.namespace'], // prioritize items that have all of the defined keys and all keys are the same
    ['name'],
  ],
});
```

## Options
```typescript
 /**
 * The prioritized keys checking for keys in arrays that are the same. If one of the prioritized keys matches, the array will
 * be merged based of the keys as identifiers. Otherwise, is searches for "similar" keys and merges them if enabled.
 * @default []
 */
prioritizedKeys: Array<string[]>;

/**
 * If true and no key of the prioritizedKeys matches, it searches for a similar key used in the array. If false, it will just append the item to the array.
 * @default true
 */
matchSimilarKeys: boolean;

/**
 * Set to true, if the output object should be cloned or not.
 * @default true
 */
cloneObject: boolean;
```