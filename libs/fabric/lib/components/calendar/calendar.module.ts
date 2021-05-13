// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as CalendarCss from 'office-ui-fabric-react/lib-amd/components/Calendar/Calendar.scss';
import { Calendar } from 'office-ui-fabric-react/lib/Calendar';
import { noop } from '@angular-react/fabric/lib/utils';
import { FabCalendarComponent } from './calendar.component';
import { CalendarStringsDirective } from './directives/calendar-strings-directive.component';

// Dummy action to force CalendarCss to load and not be tree-shaken away.
noop(CalendarCss);

const declarations = [FabCalendarComponent, CalendarStringsDirective];

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabCalendarModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Calendar', () => Calendar);
  }
}
