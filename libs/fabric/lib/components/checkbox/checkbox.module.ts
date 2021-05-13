// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { FabCheckboxComponent } from './checkbox.component';

const components = [FabCheckboxComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabCheckboxModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Checkbox', () => Checkbox);
  }
}
