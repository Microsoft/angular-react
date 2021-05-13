// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as BasePickerCss from 'office-ui-fabric-react/lib-amd/components/pickers/BasePicker.scss';
import { BasePicker } from 'office-ui-fabric-react/lib/Pickers';
import { noop } from '@angular-react/fabric/lib/utils';

// Dummy action to force BasePickerCss to load and not be tree-shaken away.
noop(BasePickerCss);

@NgModule({
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabBasePickerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('BasePicker', () => BasePicker);
  }
}
