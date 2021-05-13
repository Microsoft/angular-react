// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { FabFabricComponent } from './fabric.component';

const components = [FabFabricComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabFabricModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Fabric', () => Fabric);
  }
}
