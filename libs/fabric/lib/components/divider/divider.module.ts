// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VerticalDivider } from 'office-ui-fabric-react/lib/Divider';
import { FabDividerComponent } from './divider.component';

const components = [FabDividerComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabDividerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('VerticalDivider', () => VerticalDivider);
  }
}
