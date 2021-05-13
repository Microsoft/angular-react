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
import { ISliderProps } from 'office-ui-fabric-react/lib/Slider';

@Component({
  selector: 'fab-slider',
  exportAs: 'fabSlider',
  template: `
    <Slider
      #reactNode
      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [label]="label"
      [defaultValue]="defaultValue"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="step"
      [showValue]="showValue"
      [ariaLabel]="ariaLabel"
      [ariaValueText]="ariaValueText"
      [vertical]="vertical"
      [disabled]="disabled"
      [className]="className"
      [buttonProps]="buttonProps"
      [valueFormat]="valueFormat"
      [originFromZero]="originFromZero"
      [Changed]="onChangedHandler"
      (onChange)="onChange.emit($event)"
    >
    </Slider>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSliderComponent extends ReactWrapperComponent<ISliderProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISliderProps['componentRef'];
  @Input() styles?: ISliderProps['styles'];
  @Input() theme?: ISliderProps['theme'];
  @Input() label?: ISliderProps['label'];
  @Input() defaultValue?: ISliderProps['defaultValue'];
  @Input() value?: ISliderProps['value'];
  @Input() min?: ISliderProps['min'];
  @Input() max?: ISliderProps['max'];
  @Input() step?: ISliderProps['step'];
  @Input() showValue?: ISliderProps['showValue'];
  @Input() ariaLabel?: ISliderProps['ariaLabel'];
  @Input() ariaValueText?: ISliderProps['ariaValueText'];
  @Input() vertical?: ISliderProps['vertical'];
  @Input() disabled?: ISliderProps['disabled'];
  @Input() className?: ISliderProps['className'];
  @Input() buttonProps?: ISliderProps['buttonProps'];
  @Input() valueFormat?: ISliderProps['valueFormat'];
  @Input() originFromZero?: ISliderProps['originFromZero'];

  @Output() readonly onChange = new EventEmitter<number>();
  @Output() readonly onChanged = new EventEmitter<{ event: MouseEvent | TouchEvent; value: number }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    this.onChangedHandler = this.onChangedHandler.bind(this);
  }

  onChangedHandler(event: MouseEvent | TouchEvent, value: number) {
    this.onChanged.emit({
      event,
      value,
    });
  }
}
