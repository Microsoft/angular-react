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
} from '@angular/core';
import { ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

@Component({
  selector: 'fab-spinner',
  exportAs: 'fabSpinner',
  template: `
    <Spinner
      #reactNode
      [componentRef]="componentRef"
      [type]="type"
      [size]="size"
      [label]="label"
      [className]="className"
      [ariaLive]="ariaLive"
      [ariaLabel]="ariaLabel"
      [theme]="theme"
      [styles]="styles"
      [labelPosition]="labelPosition"
    >
    </Spinner>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSpinnerComponent extends ReactWrapperComponent<ISpinnerProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISpinnerProps['componentRef'];
  @Input() type?: ISpinnerProps['type'];
  @Input() size?: ISpinnerProps['size'];
  @Input() label?: ISpinnerProps['label'];
  @Input() className?: ISpinnerProps['className'];
  @Input() ariaLive?: ISpinnerProps['ariaLive'];
  @Input() ariaLabel?: ISpinnerProps['ariaLabel'];
  @Input() theme?: ISpinnerProps['theme'];
  @Input() styles?: ISpinnerProps['styles'];
  @Input() labelPosition?: ISpinnerProps['labelPosition'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
