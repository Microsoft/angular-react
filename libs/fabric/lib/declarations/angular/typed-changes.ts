// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as AngularCore from '@angular/core';

export interface TypedChange<T> extends AngularCore.SimpleChange {
  readonly previousValue: T;
  readonly currentValue: T;
}

/**
 * Known Angular keys that components often have
 */
export type AngularLifeCycleKeys =
  | keyof AngularCore.AfterContentChecked
  | keyof AngularCore.AfterContentInit
  | keyof AngularCore.AfterViewChecked
  | keyof AngularCore.AfterViewInit
  | keyof AngularCore.DoCheck
  | keyof AngularCore.OnChanges
  | keyof AngularCore.OnDestroy
  | keyof AngularCore.OnInit;

// Only take string keys from TComponent, since those are the only valid input property types.
// Exclude any known stuff that can be eliminated as non-Inputs.
export type InputKeys<TComponent> = Exclude<keyof TComponent & string, AngularLifeCycleKeys>;

export type TypedChanges<TComponent> = Partial<{ [P in InputKeys<TComponent>]: TypedChange<TComponent[P]> }>;

export interface OnChanges<TComponent> extends AngularCore.OnChanges {
  ngOnChanges(changes: TypedChanges<TComponent>): void;
}
