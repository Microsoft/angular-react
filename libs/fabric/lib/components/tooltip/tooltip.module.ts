// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { FabTooltipHostComponent } from './tooltip-host.component';

const components = [FabTooltipHostComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabTooltipModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('TooltipHost', () => TooltipHost);
  }
}
