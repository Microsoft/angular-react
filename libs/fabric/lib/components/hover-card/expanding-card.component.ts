// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, ReactWrapperComponent, JsxRenderFunc } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
} from '@angular/core';
import { IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';

@Component({
  selector: 'fab-expanding-card',
  exportAs: 'fabExpandingCard',
  template: `
    <ExpandingCard
      [componentRef]="componentRef"
      [className]="className"
      [directionalHint]="directionalHint"
      [directionalHintFixed]="directionalHintFixed"
      [firstFocus]="firstFocus"
      [gapSpace]="gapSpace"
      [renderData]="renderData"
      [styles]="styles"
      [targetElement]="targetElement"
      [theme]="theme"
      [trapFocus]="trapFocus"
      [compactCardHeight]="compactCardHeight"
      [expandedCardHeight]="expandedCardHeight"
      [mode]="mode"
      [RenderCompactCard]="renderCompactCard && onRenderCompactCard"
      [RenderExpandedCard]="renderExpandedCard && onRenderExpandedCard"
      (onEnter)="onEnter.emit()"
      (onLeave)="onLeave.emit()"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </ExpandingCard>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabExpandingCardComponent extends ReactWrapperComponent<IExpandingCardProps> implements OnInit {
  @ViewChild('reactNode', { static: false }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IExpandingCardProps['componentRef'];
  @Input() className?: IExpandingCardProps['className'];
  @Input() directionalHint?: IExpandingCardProps['directionalHint'];
  @Input() directionalHintFixed?: IExpandingCardProps['directionalHintFixed'];
  @Input() firstFocus?: IExpandingCardProps['firstFocus'];
  @Input() gapSpace?: IExpandingCardProps['gapSpace'];
  @Input() renderData?: IExpandingCardProps['renderData'];
  @Input() styles?: IExpandingCardProps['styles'];
  @Input() targetElement?: IExpandingCardProps['targetElement'];
  @Input() theme?: IExpandingCardProps['theme'];
  @Input() trapFocus?: IExpandingCardProps['trapFocus'];
  @Input() compactCardHeight?: IExpandingCardProps['compactCardHeight'];
  @Input() expandedCardHeight?: IExpandingCardProps['expandedCardHeight'];
  @Input() mode?: IExpandingCardProps['mode'];
  @Input() renderCompactCard?: InputRendererOptions<IExpandingCardProps>;
  @Input() renderExpandedCard?: InputRendererOptions<IExpandingCardProps>;

  @Output() readonly onEnter = new EventEmitter<void>();
  @Output() readonly onLeave = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });
  }

  onRenderCompactCard: (props?: IExpandingCardProps, defaultRender?: JsxRenderFunc<IExpandingCardProps>) => JSX.Element;
  onRenderExpandedCard: (
    props?: IExpandingCardProps,
    defaultRender?: JsxRenderFunc<IExpandingCardProps>
  ) => JSX.Element;

  ngOnInit() {
    this.onRenderCompactCard = this.createRenderPropHandler(this.renderCompactCard);
    this.onRenderExpandedCard = this.createRenderPropHandler(this.renderExpandedCard);
  }
}
