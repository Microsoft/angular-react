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
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

@Component({
  selector: 'fab-icon',
  exportAs: 'fabIcon',
  template: `
    <Icon
      #reactNode
      [iconName]="iconName"
      [ariaLabel]="ariaLabel"
      [iconType]="iconType"
      [imageProps]="imageProps"
      [imageErrorAs]="imageErrorAs"
      [styles]="styles"
      [theme]="theme"
    >
    </Icon>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabIconComponent extends ReactWrapperComponent<IIconProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IIconProps['componentRef'];

  @Input() iconName?: IIconProps['iconName'];
  @Input() ariaLabel?: IIconProps['ariaLabel'];
  @Input() iconType?: IIconProps['iconType'];
  @Input() imageProps?: IIconProps['imageProps'];
  @Input() imageErrorAs?: IIconProps['imageErrorAs'];
  @Input() styles?: IIconProps['styles'];
  @Input() theme?: IIconProps['theme'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, { setHostDisplay: true });
  }
}
