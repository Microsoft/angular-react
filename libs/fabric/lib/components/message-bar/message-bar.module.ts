// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { FabMessageBarComponent } from './message-bar.component';

const components = [FabMessageBarComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabMessageBarModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('MessageBar', () => MessageBar);
  }
}
