// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';

@Component({
  selector: 'fab-spin-button',
  exportAs: 'fabSpinButton',
  template: `
    <SpinButton
      #reactNode
      [componentRef]="componentRef"
      [defaultValue]="defaultValue"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="step"
      [ariaLabel]="ariaLabel"
      [ariaDescribedBy]="ariaDescribedBy"
      [title]="title"
      [disabled]="disabled"
      [className]="className"
      [label]="label"
      [labelPosition]="labelPosition"
      [iconProps]="iconProps"
      [incrementButtonIcon]="incrementButtonIcon"
      [decrementButtonIcon]="decrementButtonIcon"
      [styles]="styles"
      [getClassNames]="getClassNames"
      [upArrowButtonStyles]="upArrowButtonStyles"
      [downArrowButtonStyles]="downArrowButtonStyles"
      [theme]="theme"
      [incrementButtonAriaLabel]="incrementButtonAriaLabel"
      [decrementButtonAriaLabel]="decrementButtonAriaLabel"
      [precision]="precision"
      [ariaPositionInSet]="ariaPositionInSet"
      [ariaSetSize]="ariaSetSize"
      [ariaValueNow]="ariaValueNow"
      [ariaValueText]="ariaValueText"
      [keytipProps]="keytipProps"
      [Validate]="validate"
      [Increment]="increment"
      [Decrement]="decrement"
      (onFocus)="onFocus.emit($event)"
      (onBlur)="onBlur.emit($event)"
    >
    </SpinButton>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSpinButtonComponent extends ReactWrapperComponent<ISpinButtonProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISpinButtonProps['componentRef'];
  @Input() defaultValue?: ISpinButtonProps['defaultValue'];
  @Input() value?: ISpinButtonProps['value'];
  @Input() min?: ISpinButtonProps['min'];
  @Input() max?: ISpinButtonProps['max'];
  @Input() step?: ISpinButtonProps['step'];
  @Input() ariaLabel?: ISpinButtonProps['ariaLabel'];
  @Input() ariaDescribedBy?: ISpinButtonProps['ariaDescribedBy'];
  @Input() title?: ISpinButtonProps['title'];
  @Input() disabled?: ISpinButtonProps['disabled'];
  @Input() className?: ISpinButtonProps['className'];
  @Input() label?: ISpinButtonProps['label'];
  @Input() labelPosition?: ISpinButtonProps['labelPosition'];
  @Input() iconProps?: ISpinButtonProps['iconProps'];
  @Input() incrementButtonIcon?: ISpinButtonProps['incrementButtonIcon'];
  @Input() decrementButtonIcon?: ISpinButtonProps['decrementButtonIcon'];
  @Input() styles?: ISpinButtonProps['styles'];
  @Input() getClassNames?: ISpinButtonProps['getClassNames'];
  @Input() upArrowButtonStyles?: ISpinButtonProps['upArrowButtonStyles'];
  @Input() downArrowButtonStyles?: ISpinButtonProps['downArrowButtonStyles'];
  @Input() theme?: ISpinButtonProps['theme'];
  @Input() incrementButtonAriaLabel?: ISpinButtonProps['incrementButtonAriaLabel'];
  @Input() decrementButtonAriaLabel?: ISpinButtonProps['decrementButtonAriaLabel'];
  @Input() precision?: ISpinButtonProps['precision'];
  @Input() ariaPositionInSet?: ISpinButtonProps['ariaPositionInSet'];
  @Input() ariaSetSize?: ISpinButtonProps['ariaSetSize'];
  @Input() ariaValueNow?: ISpinButtonProps['ariaValueNow'];
  @Input() ariaValueText?: ISpinButtonProps['ariaValueText'];
  @Input() keytipProps?: ISpinButtonProps['keytipProps'];

  @Input() validate?: ISpinButtonProps['onValidate'];
  @Input() increment?: ISpinButtonProps['onIncrement'];
  @Input() decrement?: ISpinButtonProps['onDecrement'];

  @Output() readonly onFocus = new EventEmitter<Event>();
  @Output() readonly onBlur = new EventEmitter<Event>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
