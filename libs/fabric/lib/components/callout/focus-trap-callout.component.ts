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
import { IFocusTrapCalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { ICalloutPositionedInfo } from 'office-ui-fabric-react/lib/utilities/positioning';

@Component({
  selector: 'fab-focus-trap-callout',
  exportAs: 'fabFocusTrapCallout',
  template: `
    <FocusTrapCallout
      #reactNode
     #reactNode
      [componentRef]="componentRef"
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
      [focusTrapProps]="focusTrapProps"
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
export class FabFocusTrapCalloutComponent extends ReactWrapperComponent<IFocusTrapCalloutProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() target?: IFocusTrapCalloutProps['target'];
  @Input() directionalHint?: IFocusTrapCalloutProps['directionalHint'];
  @Input() directionalHintForRTL?: IFocusTrapCalloutProps['directionalHintForRTL'];
  @Input() gapSpace?: IFocusTrapCalloutProps['gapSpace'];
  @Input() beakWidth?: IFocusTrapCalloutProps['beakWidth'];
  @Input() calloutWidth?: IFocusTrapCalloutProps['calloutWidth'];
  @Input() backgroundColor?: IFocusTrapCalloutProps['backgroundColor'];
  @Input() bounds?: IFocusTrapCalloutProps['bounds'];
  @Input() minPagePadding?: IFocusTrapCalloutProps['minPagePadding'];
  @Input() isBeakVisible?: IFocusTrapCalloutProps['isBeakVisible'];
  @Input() preventDismissOnScroll?: IFocusTrapCalloutProps['preventDismissOnScroll'];
  @Input() preventDismissOnResize?: IFocusTrapCalloutProps['preventDismissOnResize'];
  @Input() preventDismissOnLostFocus?: IFocusTrapCalloutProps['preventDismissOnLostFocus'];
  @Input() coverTarget?: IFocusTrapCalloutProps['coverTarget'];
  @Input() alignTargetEdge?: IFocusTrapCalloutProps['alignTargetEdge'];
  @Input() role?: IFocusTrapCalloutProps['role'];
  @Input() ariaLabel?: IFocusTrapCalloutProps['ariaLabel'];
  @Input() ariaLabelledBy?: IFocusTrapCalloutProps['ariaLabelledBy'];
  @Input() ariaDescribedBy?: IFocusTrapCalloutProps['ariaDescribedBy'];
  @Input() className?: IFocusTrapCalloutProps['className'];
  @Input() layerProps?: IFocusTrapCalloutProps['layerProps'];
  @Input() doNotLayer?: IFocusTrapCalloutProps['doNotLayer'];
  @Input() directionalHintFixed?: IFocusTrapCalloutProps['directionalHintFixed'];
  @Input() finalHeight?: IFocusTrapCalloutProps['finalHeight'];
  @Input() hideOverflow?: IFocusTrapCalloutProps['hideOverflow'];
  @Input() setInitialFocus?: IFocusTrapCalloutProps['setInitialFocus'];
  @Input() calloutMaxHeight?: IFocusTrapCalloutProps['calloutMaxHeight'];
  @Input() theme?: IFocusTrapCalloutProps['theme'];
  @Input() styles?: IFocusTrapCalloutProps['styles'];
  @Input() hidden?: IFocusTrapCalloutProps['hidden'];
  @Input() shouldRestoreFocus?: IFocusTrapCalloutProps['shouldRestoreFocus'];
  @Input() focusTrapProps?: IFocusTrapCalloutProps['focusTrapProps'];

  @Output() readonly onLayerMounted = new EventEmitter<void>();
  @Output() readonly onPositioned = new EventEmitter<{ positions?: ICalloutPositionedInfo }>();
  @Output() readonly onDismiss = new EventEmitter<{ ev?: any }>();
  @Output() readonly onScroll = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
