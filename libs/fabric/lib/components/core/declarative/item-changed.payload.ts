// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export interface PropertyChange<TValue> {
  readonly currentValue: TValue;
}

export type ItemChanges<TItem> = { readonly [P in keyof TItem]?: PropertyChange<TItem[P]> };

export interface ItemChangedPayload<TKey extends string, TItem> {
  readonly key: TKey;
  readonly changes: ItemChanges<TItem>;
}
