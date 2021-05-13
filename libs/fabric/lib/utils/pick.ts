// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Pick a a set of properties from an object.
 *
 * Does **not** modify the original object.
 * @param obj the object
 * @param keys the keys
 * @returns A new object with all properties from the `keys` from `obj`
 */
export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce<Pick<T, K>>((acc, key) => Object.assign(acc, { [key]: obj[key] }), {} as any);
}

export default pick;
