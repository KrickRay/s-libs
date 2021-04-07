import { Nil, Primitive } from '../interfaces';
import { valuesOfNonArray } from '../object/values';

/**
 * Converts `value` to an array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,883 bytes
 * - Micro-dash: 188 bytes
 */

export function toArray(value: string): string[];
export function toArray<T extends readonly any[]>(value: T): T;
export function toArray<T extends object>(value: T): Array<T[keyof T]>;
export function toArray(value: Primitive | Nil): [];
export function toArray(value: any): any[];

export function toArray(value: any): any[] {
  if (value && value[Symbol.iterator]) {
    return Array.from(value);
  } else {
    return valuesOfNonArray(value);
  }
}
