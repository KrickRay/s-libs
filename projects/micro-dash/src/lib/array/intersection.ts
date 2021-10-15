import { Nil } from '../interfaces';

/**
 * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,789 bytes
 * - Micro-dash: 115 bytes
 */
export function intersection<T>(...arrays: Array<readonly T[] | Nil>): T[] {
  const sets = arrays.map((array) => new Set(array));
  return [...sets[0]].filter((value) => sets.every((set) => set.has(value)));
}