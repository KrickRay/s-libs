import { IfCouldBe, Nil, ObjectIteratee } from '../interfaces';
import { forOwn } from './for-own';

/**
 * Creates an object with the same keys as `object` and values generated by running each own enumerable string keyed property of `object` thru `iteratee`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 13,946 bytes
 * - Micro-dash: 278 bytes
 */

export function mapValues<A extends any[] | Nil, O>(
  array: A,
  iteratee: (item: NonNullable<A>[number], index: number) => O,
): { [index: number]: O } | IfCouldBe<A, Nil, {}>;

export function mapValues<T, O>(
  object: T,
  iteratee: ObjectIteratee<T, O>,
): { [key in keyof NonNullable<T>]: O } | IfCouldBe<T, Nil, {}>;

export function mapValues(object: any, iteratee: Function): any {
  const obj: any = {};
  forOwn(object, (value, key) => {
    obj[key] = iteratee(value, key);
  });
  return obj;
}