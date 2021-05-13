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
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { ICalloutPositionedInfo } from 'office-ui-fabric-react/lib/utilities/positioning/positioning.types';

@Component({
  selector: 'fab-callout',
  exportAs: 'fabCallout',
  template: `
    <Callout
      #reactNode
      [target]="target"
      [directionalHint]="directionalHint"
      [directionalHintForRTL]="directionalHintForRTL"
      [gapSpace]="gapSpace"
      [beakWidth]="beakWidth"
      [calloutWidth]="calloutWidth"
      [backgroundColor]="backgroundColor"
      [bounds]="bounds"
      [minPagePadding]="minPagePadding"
      [isBeakVisible]="isBeakVisible"
      [preventDismissOnScroll]="preventDismissOnScroll"
      [preventDismissOnResize]="preventDismissOnResize"
      [preventDismissOnLostFocus]="preventDismissOnLostFocus"
      [coverTarget]="coverTarget"
      [alignTargetEdge]="alignTargetEdge"
      [role]="role"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [ariaDescribedBy]="ariaDescribedBy"
      [className]="className"
      [layerProps]="layerProps"
      [doNotLayer]="doNotLayer"
      [directionalHintFixed]="directionalHintFixed"
      [finalHeight]="finalHeight"
      [hideOverflow]="hideOverflow"
      [setInitialFocus]="setInitialFocus"
      [calloutMaxHeight]="calloutMaxHeight"
      [theme]="theme"
      [styles]="styles"
      [hidden]="hidden"
      [shouldRestoreFocus]="shouldRestoreFocus"
      (onLayerMounted)="onLayerMounted.emit()"
      (onPositioned)="onPositioned.emit($event)"
      (onDismiss)="onDismiss.emit($event)"
      (onScroll)="onScroll.emit()"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Callout>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabCalloutComponent extends ReactWrapperComponent<ICalloutProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() target?: ICalloutProps['target'];
  @Input() directionalHint?: ICalloutProps['directionalHint'];
  @Input() directionalHintForRTL?: ICalloutProps['directionalHintForRTL'];
  @Input() gapSpace?: ICalloutProps['gapSpace'];
  @Input() beakWidth?: ICalloutProps['beakWidth'];
  @Input() calloutWidth?: ICalloutProps['calloutWidth'];
  @Input() backgroundColor?: ICalloutProps['backgroundColor'];
  @Input() bounds?: ICalloutProps['bounds'];
  @Input() minPagePadding?: ICalloutProps['minPagePadding'];
  @Input() isBeakVisible?: ICalloutProps['isBeakVisible'];
  @Input() preventDismissOnScroll?: ICalloutProps['preventDismissOnScroll'];
  @Input() preventDismissOnResize?: ICalloutProps['preventDismissOnResize'];
  @Input() preventDismissOnLostFocus?: ICalloutProps['preventDismissOnLostFocus'];
  @Input() coverTarget?: ICalloutProps['coverTarget'];
  @Input() alignTargetEdge?: ICalloutProps['alignTargetEdge'];
  @Input() role?: ICalloutProps['role'];
  @Input() ariaLabel?: ICalloutProps['ariaLabel'];
  @Input() ariaLabelledBy?: ICalloutProps['ariaLabelledBy'];
  @Input() ariaDescribedBy?: ICalloutProps['ariaDescribedBy'];
  @Input() className?: ICalloutProps['className'];
  @Input() layerProps?: ICalloutProps['layerProps'];
  @Input() doNotLayer?: ICalloutProps['doNotLayer'];
  @Input() directionalHintFixed?: ICalloutProps['directionalHintFixed'];
  @Input() finalHeight?: ICalloutProps['finalHeight'];
  @Input() hideOverflow?: ICalloutProps['hideOverflow'];
  @Input() setInitialFocus?: ICalloutProps['setInitialFocus'];
  @Input() calloutMaxHeight?: ICalloutProps['calloutMaxHeight'];
  @Input() theme?: ICalloutProps['theme'];
  @Input() styles?: ICalloutProps['styles'];
  @Input() hidden?: ICalloutProps['hidden'];
  @Input() shouldRestoreFocus?: ICalloutProps['shouldRestoreFocus'];

  @Output() readonly onLayerMounted = new EventEmitter<void>();
  @Output() readonly onPositioned = new EventEmitter<{ positions?: ICalloutPositionedInfo }>();
  @Output() readonly onDismiss = new EventEmitter<{ ev?: any }>();
  @Output() readonly onScroll = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
