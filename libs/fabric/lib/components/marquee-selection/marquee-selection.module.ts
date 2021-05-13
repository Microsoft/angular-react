// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@angular-react/core';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

import { FabMarqueeSelectionComponent } from './marquee-selection.component';

const components = [FabMarqueeSelectionComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabMarqueeSelectionModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('MarqueeSelection', () => MarqueeSelection);
  }
}
