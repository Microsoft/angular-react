// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, passProp, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IPivotItemProps, IPivotProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';

@Component({
  selector: 'fab-pivot-item',
  exportAs: 'fabPivotItem',
  template: `
    <PivotItem
      #reactNode
      [componentRef]="componentRef"
      [headerText]="headerText"
      [headerButtonProps]="headerButtonProps"
      [itemKey]="itemKey"
      [ariaLabel]="ariaLabel"
      [itemCount]="itemCount"
      [itemIcon]="itemIcon"
      [keytipProps]="keytipProps"
      [RenderItemLink]="renderItemLink && onRenderItemLink"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </PivotItem>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPivotItemComponent extends ReactWrapperComponent<IPivotItemProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() disabled? = false;
  @Input() @passProp() componentRef?: IPivotItemProps['componentRef'];
  @Input() @passProp() headerText?: IPivotItemProps['headerText'];
  @Input() @passProp() headerButtonProps?: IPivotItemProps['headerButtonProps'];
  @Input() @passProp() itemKey?: IPivotItemProps['itemKey'];
  @Input() @passProp() ariaLabel?: IPivotItemProps['ariaLabel'];
  @Input() @passProp() itemCount?: IPivotItemProps['itemCount'];
  @Input() @passProp() itemIcon?: IPivotItemProps['itemIcon'];
  @Input() @passProp() keytipProps?: IPivotItemProps['keytipProps'];
  @Input() @passProp() renderItemLink?: InputRendererOptions<IPivotItemProps>;

  @passProp() onRenderItemLink: (props?: IPivotItemProps, defaultRender?: JsxRenderFunc<IPivotItemProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }

  ngOnInit() {
    this.onRenderItemLink = this.createRenderPropHandler(this.renderItemLink);
  }
}

@Component({
  selector: 'fab-pivot',
  exportAs: 'fabPivot',
  template: `
    <Disguise
      #reactNode
      [disguiseRootAs]="PivotType"
      [disguiseChildrenAs]="PivotItemType"
      [ngChildComponents]="children || pivotItems?.toArray()"
      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [className]="className"
      [defaultSelectedKey]="defaultSelectedKey"
      [defaultSelectedIndex]="defaultSelectedIndex"
      [selectedKey]="selectedKey"
      [linkSize]="linkSize"
      [linkFormat]="linkFormat"
      [headersOnly]="headersOnly"
      [getTabId]="getTabId"
      [LinkClick]="onLinkClickHandler"
    >
      <ReactContent><ng-content select="fab-pivot-item"></ng-content></ReactContent>
    </Disguise>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPivotComponent extends ReactWrapperComponent<IPivotProps> {
  readonly PivotType = Pivot;
  readonly PivotItemType = PivotItem;

  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @ContentChildren(FabPivotItemComponent) pivotItems: QueryList<FabPivotItemComponent>;

  @Input() componentRef?: IPivotProps['componentRef'];
  @Input() styles?: IPivotProps['styles'];
  @Input() theme?: IPivotProps['theme'];
  @Input() className?: IPivotProps['className'];
  @Input() defaultSelectedKey?: IPivotProps['defaultSelectedKey'];
  @Input() defaultSelectedIndex?: IPivotProps['defaultSelectedIndex'];
  @Input() selectedKey?: IPivotProps['selectedKey'];
  @Input() linkSize?: IPivotProps['linkSize'];
  @Input() linkFormat?: IPivotProps['linkFormat'];
  @Input() headersOnly?: IPivotProps['headersOnly'];
  @Input() getTabId?: IPivotProps['getTabId'];
  @Input() children?: QueryList<FabPivotItemComponent>;

  @Output() readonly onLinkClick = new EventEmitter<{ item?: PivotItem; ev?: MouseEvent }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, { setHostDisplay: true });

    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);
  }

  onLinkClickHandler(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    this.onLinkClick.emit({
      ev: ev && ev.nativeEvent,
      item: item,
    });
  }
}
