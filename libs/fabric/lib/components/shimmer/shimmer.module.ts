// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Shimmer, ShimmerElementsGroup } from 'office-ui-fabric-react/lib/Shimmer';
import { FabShimmerComponent, FabShimmerElementsGroupComponent } from './shimmer.component';

const components = [FabShimmerComponent, FabShimmerElementsGroupComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabShimmerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Shimmer', () => Shimmer);
    registerElement('ShimmerElementsGroup', () => ShimmerElementsGroup);
  }
}
