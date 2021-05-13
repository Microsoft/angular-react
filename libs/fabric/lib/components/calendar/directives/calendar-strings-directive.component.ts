// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Directive, Input } from '@angular/core';
import { ICalendarStrings } from 'office-ui-fabric-react/lib/Calendar';

/**
 * Wrapper directive for calendar strings
 */
@Directive({ selector: 'fab-calendar > fab-calendar-strings' })
export class CalendarStringsDirective {

  @Input() months: ICalendarStrings['months'];
  @Input() shortMonths: ICalendarStrings['shortMonths'];
  @Input() days: ICalendarStrings['days'];
  @Input() shortDays: ICalendarStrings['shortDays'];
  @Input() goToToday: ICalendarStrings['goToToday'];
  @Input() prevMonthAriaLabel?: ICalendarStrings['prevMonthAriaLabel'];
  @Input() nextMonthAriaLabel?: ICalendarStrings['nextMonthAriaLabel'];
  @Input() prevYearAriaLabel?: ICalendarStrings['prevYearAriaLabel'];
  @Input() nextYearAriaLabel?: ICalendarStrings['nextYearAriaLabel'];
  @Input() prevYearRangeAriaLabel?: ICalendarStrings['prevYearRangeAriaLabel'];
  @Input() nextYearRangeAriaLabel?: ICalendarStrings['nextYearRangeAriaLabel'];
  @Input() closeButtonAriaLabel?: ICalendarStrings['closeButtonAriaLabel'];
  @Input() weekNumberFormatString?: ICalendarStrings['weekNumberFormatString'];


  get strings(): ICalendarStrings {
    return {
      months: this.months,
      shortMonths: this.shortMonths,
      days: this.days,
      shortDays: this.shortDays,
      goToToday: this.goToToday,
      prevMonthAriaLabel: this.prevMonthAriaLabel,
      nextMonthAriaLabel: this.nextMonthAriaLabel,
      prevYearAriaLabel: this.prevYearAriaLabel,
      nextYearAriaLabel: this.nextYearAriaLabel,
      prevYearRangeAriaLabel: this.prevYearRangeAriaLabel,
      nextYearRangeAriaLabel: this.nextYearRangeAriaLabel,
      closeButtonAriaLabel: this.closeButtonAriaLabel,
      weekNumberFormatString: this.weekNumberFormatString
    }
  }
}
