import { keys } from '../object';

/**
 * Gets the size of collection by returning the number of its own enumerable string keyed properties.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,251 bytes
 * - Micro-dash: 210 bytes
 */

export function size(collection: object): number;
// tslint:disable-next-line:unified-signatures
export function size(collection: readonly any[] | string): number;

export function size(collection: object | readonly any[] | string): number {
  return keys(collection).length;
}
