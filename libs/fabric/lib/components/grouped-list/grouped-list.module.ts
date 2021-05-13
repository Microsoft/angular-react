// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { FabGroupedListComponent } from './grouped-list.component';

const components = [FabGroupedListComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabGroupedListModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('GroupedList', () => GroupedList);
  }
}
