// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { FabSpinButtonComponent } from './spin-button.component';

const components = [FabSpinButtonComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabSpinButtonModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('SpinButton', () => SpinButton);
  }
}
