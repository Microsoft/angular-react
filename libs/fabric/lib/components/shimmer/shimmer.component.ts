// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IShimmerElementsGroupProps } from 'office-ui-fabric-react/lib/components/Shimmer/ShimmerElementsGroup/ShimmerElementsGroup.types';
import { IShimmerProps } from 'office-ui-fabric-react/lib/Shimmer';

@Component({
  selector: 'fab-shimmer',
  exportAs: 'fabShimmer',
  template: `
    <Shimmer
      #reactNode
      [componentRef]="componentRef"
      [width]="width"
      [isDataLoaded]="isDataLoaded"
      [shimmerElements]="shimmerElements"
      [ariaLabel]="ariaLabel"
      [styles]="styles"
      [className]="className"
      [theme]="theme"
      [shimmerColors]="shimmerColors"
      [customElementsGroup]="customElementsGroup"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Shimmer>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabShimmerComponent extends ReactWrapperComponent<IShimmerProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IShimmerProps['componentRef'];
  @Input() width?: IShimmerProps['width'];
  @Input() isDataLoaded?: IShimmerProps['isDataLoaded'];
  @Input() shimmerElements?: IShimmerProps['shimmerElements'];
  @Input() ariaLabel?: IShimmerProps['ariaLabel'];
  @Input() styles?: IShimmerProps['styles'];
  @Input() className?: IShimmerProps['className'];
  @Input() theme?: IShimmerProps['theme'];
  @Input() shimmerColors?: IShimmerProps['shimmerColors'];

  @Input()
  set renderCustomElementsGroup(value: InputRendererOptions<{}>) {
    this._renderCustomElementsGroup = value;

    if (value) {
      this.customElementsGroup = this.createInputJsxRenderer(value)({});
    }
  }

  get renderCustomElementsGroup(): InputRendererOptions<{}> {
    return this._renderCustomElementsGroup;
  }

  customElementsGroup?: React.ReactNode;

  private _renderCustomElementsGroup?: InputRendererOptions<{}>;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }
}

@Component({
  selector: 'fab-shimmer-elements-group',
  exportAs: 'fabShimmerElementsGroup',
  template: `
    <ShimmerElementsGroup
      #reactNode
      [componentRef]="componentRef"
      [rowHeight]="rowHeight"
      [shimmerElements]="shimmerElements"
      [flexWrap]="flexWrap"
      [width]="width"
      [theme]="theme"
      [backgroundColor]="backgroundColor"
      [styles]="styles"
    >
    </ShimmerElementsGroup>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabShimmerElementsGroupComponent extends ReactWrapperComponent<IShimmerElementsGroupProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IShimmerElementsGroupProps['componentRef'];
  @Input() rowHeight?: IShimmerElementsGroupProps['rowHeight'];
  @Input() shimmerElements?: IShimmerElementsGroupProps['shimmerElements'];
  @Input() flexWrap?: IShimmerElementsGroupProps['flexWrap'];
  @Input() width?: IShimmerElementsGroupProps['width'];
  @Input() theme?: IShimmerElementsGroupProps['theme'];
  @Input() backgroundColor?: IShimmerElementsGroupProps['backgroundColor'];
  @Input() styles?: IShimmerElementsGroupProps['styles'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, { setHostDisplay: true });
  }
}
