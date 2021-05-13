// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FabSearchBoxComponent } from './search-box.component';

const components = [FabSearchBoxComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabSearchBoxModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('SearchBox', () => SearchBox);
  }
}
