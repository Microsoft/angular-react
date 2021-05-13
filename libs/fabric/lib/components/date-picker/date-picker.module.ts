// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import * as CalendarCss from 'office-ui-fabric-react/lib-amd/components/Calendar/Calendar.scss';
import { noop } from '@angular-react/fabric/lib/utils';
import { FabDatePickerComponent } from './date-picker.component';

// Dummy action to force CalendarCss to load and not be tree-shaken away.
noop(CalendarCss);

const components = [FabDatePickerComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabDatePickerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DatePicker', () => DatePicker);
  }
}
