// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FabBaseTextFieldComponent } from './base-text-field.component';

@Component({
  selector: 'fab-text-field',
  exportAs: 'fabTextField',
  template: `
    <TextField
      #reactNode
      [required]="required"
      [placeholder]="placeholder"
      [type]="type"
      [cols]="cols"
      [colSpan]="colSpan"
      [rows]="rows"
      [rowSpan]="rowSpan"
      [min]="min"
      [max]="max"
      [pattern]="pattern"
      [htmlFor]="htmlFor"
      [componentRef]="componentRef"
      [multiline]="multiline"
      [resizable]="resizable"
      [autoAdjustHeight]="autoAdjustHeight"
      [underlined]="underlined"
      [borderless]="borderless"
      [label]="label"
      [description]="description"
      [prefix]="prefix"
      [suffix]="suffix"
      [iconProps]="iconProps"
      [defaultValue]="defaultValue"
      [value]="value"
      [disabled]="disabled"
      [readOnly]="readOnly"
      [errorMessage]="errorMessage"
      [deferredValidationTime]="deferredValidationTime"
      [className]="className"
      [inputClassName]="inputClassName"
      [ariaLabel]="ariaLabel"
      [validateOnFocusIn]="validateOnFocusIn"
      [validateOnFocusOut]="validateOnFocusOut"
      [validateOnLoad]="validateOnLoad"
      [theme]="theme"
      [styles]="styles"
      [autoComplete]="autoComplete"
      [mask]="mask"
      [maskChar]="maskChar"
      [maskFormat]="maskFormat"
      [GetErrorMessage]="getErrorMessage"
      [RenderLabel]="renderLabel"
      [RenderDescription]="renderDescription"
      [RenderPrefix]="renderPrefix"
      [RenderSuffix]="renderSuffix"
      [Change]="onChangeHandler"
      [BeforeChange]="onBeforeChangeHandler"
      [maxLength]="maxLength"
      [NotifyValidationResult]="onNotifyValidationResultHandler"
      (onClick)="onClickHandler($event)"
      (onFocus)="onFocusHandler($event)"
      (onBlur)="onBlurHandler($event)"
    >
    </TextField>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTextFieldComponent extends FabBaseTextFieldComponent {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
