// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { FabChoiceGroupComponent } from './choice-group.component';

const components = [FabChoiceGroupComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabChoiceGroupModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('ChoiceGroup', () => ChoiceGroup);
  }
}
