// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { FabDropdownComponent } from './dropdown.component';
import { DropdownOptionDirective } from './directives/dropdown-option.directive';
import { DropdownOptionsDirective } from './directives/dropdown-options.directive';

const declarations = [
  FabDropdownComponent,
  DropdownOptionDirective,
  DropdownOptionsDirective
];

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabDropdownModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Dropdown', () => Dropdown);
  }
}
