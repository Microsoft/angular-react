// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { FabTextFieldComponent } from './text-field.component';
import { FabMaskedTextFieldComponent } from './masked-text-field.component';

const components = [FabTextFieldComponent, FabMaskedTextFieldComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabTextFieldModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('TextField', () => TextField);
    registerElement('MaskedTextField', () => MaskedTextField);
  }
}
