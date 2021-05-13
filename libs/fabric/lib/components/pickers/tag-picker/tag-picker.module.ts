// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TagPicker } from 'office-ui-fabric-react';
import { FabBasePickerModule } from '../base-picker/base-picker.module';
import { FabTagPickerComponent } from './tag-picker.component';

const components = [FabTagPickerComponent];

@NgModule({
  imports: [CommonModule, FabBasePickerModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabTagPickerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('TagPicker', () => TagPicker as any);
  }
}
