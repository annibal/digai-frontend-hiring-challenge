import { OverrideReturn } from "./utility-types";

export type OneOrMany<T> = T | T[];

/**
 * Checks if an value is an Array (many instead of one).
 *
 * @param val - Something that may be a single thing, or might be a list of many things.
 * @returns {boolean} True if {val} is a list of many things.
 */
export function isItMany<T>(val: OneOrMany<T>): boolean {
  // return !(
  //   (() => { console.log(1); return val == null; })() ||
  //   (() => { console.log(2); return !(val instanceof Array); })() ||
  //   (() => { console.log(3); return !Array.isArray(val); })() ||
  //   (() => { console.log(4); return (val as T[]).length === undefined; })() ||
  //   (() => { console.log(5); return typeof (val as T[]).push !== "function"; })()
  // )
  return !(
    val == null ||
    !(val instanceof Array) ||
    !Array.isArray(val) ||
    (val as T[]).length === undefined ||
    typeof (val as T[]).push !== "function"
  );
}

/**
 * make One Be Many()
 * - If `val` is Array : `return val`
 * - If `val` isn't    : `return [val]`
 *
 * @param val A single Thing or an array of Things.
 * @returns always an array of Things
 */
export function makeOneBeMany<T>(val: OneOrMany<T>): T[] {
  return (isItMany(val) ? val : [val]) as T[];
}

/**
 * map Many or [make a] New One ()
 * - If `val` is Array : `val.map(callback)`
 * - If `val` isn't    : `callback(val, 0, [val])`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (value: T, index: number, array: T[]) => V
 * @returns Either the transformed Thing, or an array of transformed Things
 */
export function mapManyOrNewOne<T, V>(
  val: OneOrMany<T>,
  callback: OverrideReturn<Parameters<Array<T>["map"]>[0], V>
): OneOrMany<V> {
  return isItMany(val)
    ? (val as T[]).map(callback)
    : callback(val as T, 0, [val as T]);
}
/**
 * reduce Many or [make a] New One ()
 * - If `val` is Array : `val.reduce(callback, initialValue)`
 * - If `val` isn't    : `[val].reduce(callback, initialValue)`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (prev: U, curr: T, idx: number, arr: T[]) => U
 * @param initialValue Passed directly to `Array.reduce()`
 * @returns The reduced value
 */
export function reduceManyOrNewOne<T, V>(
  val: OneOrMany<T>,
  callback: OverrideReturn<Parameters<Array<T>["reduce"]>[0], V>,
  initialValue?: unknown
): V {
  return makeOneBeMany(val).reduce(callback, initialValue) as V;
}

/**
 * filter Many Or Null [or] One ()
 * - If `val` is Array : `val.filter(callback)`
 * - If `val` isn't    : `callback(val, 0, [val]) ? val : null`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (value: T, index: number, array: T[]) => boolean
 * @returns The filtered list of Things | The same Thing provided | null
 */
export function filterManyOrNullOne<T>(
  val: OneOrMany<T>,
  callback: OverrideReturn<Parameters<Array<T>["filter"]>[0], boolean>
): OneOrMany<T> {
  return isItMany(val)
    ? (val as T[]).filter(callback)
    : callback(val as T, 0, [val as T])
      ? val
      : null;
}

/**
 * some [of] Many Or Check One ()
 * - If `val` is Array : `val.some(callback, initialValue)`
 * - If `val` isn't    : `[val].some(callback, initialValue)`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (value: T, index: number, array: T[]) => boolean
 * @returns boolean
 */
export function someManyOrCheckOne<T>(
  val: OneOrMany<T>,
  callback: OverrideReturn<Parameters<Array<T>["some"]>[0], boolean>
): boolean {
  return makeOneBeMany(val).some(callback);
}

/**
 * every [one of] Many Or Check One ()
 * - If `val` is Array : `val.every(callback, initialValue)`
 * - If `val` isn't    : `[val].every(callback, initialValue)`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (value: T, index: number, array: T[]) => boolean
 * @returns boolean
 */
export function everyManyOrCheckOne<T>(
  val: OneOrMany<T>,
  callback: OverrideReturn<Parameters<Array<T>["some"]>[0], boolean>
): boolean {
  return makeOneBeMany(val).some(callback);
}

/**
 * for [each of] Many Or For One ()
 * - If `val` is Array : `val.forEach(callback)`
 * - If `val` isn't    : `callback(val, 0, [val])`
 *
 * @param val A single Thing or an array of Things.
 * @param callback (value: T, index: number, array: T[]) => void
 * @returns void
 */
export function forManyOrForOne<T>(
  val: OneOrMany<T>,
  callback: Parameters<Array<T>["forEach"]>[0]
): void {
  return isItMany(val)
    ? (val as T[]).forEach(callback)
    : callback(val as T, 0, [val as T]);
}
