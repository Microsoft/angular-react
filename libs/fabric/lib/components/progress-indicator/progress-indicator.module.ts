// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { FabProgressIndicatorComponent } from './progress-indicator.component';

const components = [FabProgressIndicatorComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabProgressIndicatorModule {
  constructor() {
    registerElement('ProgressIndicator', () => ProgressIndicator);
  }
}
