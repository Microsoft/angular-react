// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as PeoplePickerItemCss from 'office-ui-fabric-react/lib-amd/components/pickers/PeoplePicker/PeoplePickerItems/PickerItemsDefault.scss';
import { NormalPeoplePickerBase } from 'office-ui-fabric-react/lib/Pickers';
import { noop } from '@angular-react/fabric/lib/utils';
import { FabBasePickerModule } from '../base-picker/base-picker.module';
import { FabPeoplePickerComponent } from './people-picker.component';

// Dummy action to force PeoplePickerItemCss to load and not be tree-shaken away.
noop(PeoplePickerItemCss);

const components = [FabPeoplePickerComponent];

@NgModule({
  imports: [CommonModule, FabBasePickerModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabPeoplePickerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('PeoplePicker', () => NormalPeoplePickerBase as any);
  }
}
