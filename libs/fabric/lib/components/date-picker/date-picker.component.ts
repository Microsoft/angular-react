// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';

@Component({
  selector: 'fab-date-picker',
  exportAs: 'fabDatePicker',
  template: `
    <DatePicker
      #reactNode
      [componentRef]="componentRef"
      [theme]="theme"
      [calendarProps]="calendarProps"
      [textField]="textField"
      [calloutProps]="calloutProps"
      [calendarAs]="calendarAs"
      [label]="label"
      [isRequired]="isRequired"
      [disabled]="disabled"
      [ariaLabel]="ariaLabel"
      [underlined]="underlined"
      [pickerAriaLabel]="pickerAriaLabel"
      [isMonthPickerVisible]="isMonthPickerVisible"
      [showMonthPickerAsOverlay]="showMonthPickerAsOverlay"
      [allowTextInput]="allowTextInput"
      [disableAutoFocus]="disableAutoFocus"
      [placeholder]="placeholder"
      [today]="today"
      [value]="value"
      [formatDate]="formatDate"
      [parseDateFromString]="parseDateFromString"
      [firstDayOfWeek]="firstDayOfWeek"
      [strings]="strings"
      [highlightCurrentMonth]="highlightCurrentMonth"
      [highlightSelectedMonth]="highlightSelectedMonth"
      [showWeekNumbers]="showWeekNumbers"
      [firstWeekOfYear]="firstWeekOfYear"
      [showGoToToday]="showGoToToday"
      [borderless]="borderless"
      [className]="className"
      [dateTimeFormatter]="dateTimeFormatter"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [initialPickerDate]="initialPickerDate"
      [allFocusable]="allFocusable"
      [showCloseButton]="showCloseButton"
      [SelectDate]="onSelectDateHandler"
      (onAfterMenuDismiss)="onAfterMenuDismiss.emit()"
    >
    </DatePicker>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDatePickerComponent extends ReactWrapperComponent<IDatePickerProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IDatePickerProps['componentRef'];
  @Input() theme?: IDatePickerProps['theme'];
  @Input() calloutProps?: IDatePickerProps['calloutProps'];
  @Input() calendarProps?: IDatePickerProps['calendarProps'];
  @Input() textField?: IDatePickerProps['textField'];
  @Input() calendarAs?: IDatePickerProps['calendarAs'];
  @Input() label?: IDatePickerProps['label'];
  @Input() isRequired?: IDatePickerProps['isRequired'];
  @Input() disabled?: IDatePickerProps['disabled'];
  @Input() ariaLabel?: IDatePickerProps['ariaLabel'];
  @Input() underlined?: IDatePickerProps['underlined'];
  @Input() pickerAriaLabel?: IDatePickerProps['pickerAriaLabel'];
  @Input() isMonthPickerVisible?: IDatePickerProps['isMonthPickerVisible'];
  @Input() showMonthPickerAsOverlay?: IDatePickerProps['showMonthPickerAsOverlay'];
  @Input() allowTextInput?: IDatePickerProps['allowTextInput'];
  @Input() disableAutoFocus?: IDatePickerProps['disableAutoFocus'];
  @Input() placeholder?: IDatePickerProps['placeholder'];
  @Input() today?: IDatePickerProps['today'];
  @Input() value?: IDatePickerProps['value'];
  @Input() formatDate?: IDatePickerProps['formatDate'];
  @Input() parseDateFromString?: IDatePickerProps['parseDateFromString'];
  @Input() firstDayOfWeek?: IDatePickerProps['firstDayOfWeek'];
  @Input() strings?: IDatePickerProps['strings'];
  @Input() highlightCurrentMonth?: IDatePickerProps['highlightCurrentMonth'];
  @Input() highlightSelectedMonth?: IDatePickerProps['highlightSelectedMonth'];
  @Input() showWeekNumbers?: IDatePickerProps['showWeekNumbers'];
  @Input() firstWeekOfYear?: IDatePickerProps['firstWeekOfYear'];
  @Input() showGoToToday?: IDatePickerProps['showGoToToday'];
  @Input() borderless?: IDatePickerProps['borderless'];
  @Input() className?: IDatePickerProps['className'];
  @Input() dateTimeFormatter?: IDatePickerProps['dateTimeFormatter'];
  @Input() minDate?: IDatePickerProps['minDate'];
  @Input() maxDate?: IDatePickerProps['maxDate'];
  @Input() initialPickerDate?: IDatePickerProps['initialPickerDate'];
  @Input() allFocusable?: IDatePickerProps['allFocusable'];
  @Input() showCloseButton?: IDatePickerProps['showCloseButton'];
  @Input() tabIndex?: IDatePickerProps['tabIndex'];

  @Output() readonly onSelectDate = new EventEmitter<{ date: Date | null | undefined }>();
  @Output() readonly onAfterMenuDismiss = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    this.onSelectDateHandler = this.onSelectDateHandler.bind(this);
  }

  onSelectDateHandler(date: Date | null | undefined) {
    this.onSelectDate.emit({
      date,
    });
  }
}
