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
import { IPlainCardProps } from 'office-ui-fabric-react/lib/HoverCard';

@Component({
  selector: 'fab-plain-card',
  exportAs: 'fabPlainCard',
  template: `
    <PlainCard
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
      [RenderPlainCard]="renderPlainCard && onRenderPlainCard"
      (onEnter)="onEnter.emit()"
      (onLeave)="onLeave.emit()"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </PlainCard>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPlainCardComponent extends ReactWrapperComponent<IPlainCardProps> implements OnInit {
  @ViewChild('reactNode', { static: false }) protected reactNodeRef: ElementRef;

  @Input() componentRef: IPlainCardProps['componentRef'];
  @Input() className: IPlainCardProps['className'];
  @Input() directionalHint: IPlainCardProps['directionalHint'];
  @Input() directionalHintFixed: IPlainCardProps['directionalHintFixed'];
  @Input() firstFocus: IPlainCardProps['firstFocus'];
  @Input() gapSpace: IPlainCardProps['gapSpace'];
  @Input() renderData: IPlainCardProps['renderData'];
  @Input() styles: IPlainCardProps['styles'];
  @Input() targetElement: IPlainCardProps['targetElement'];
  @Input() theme: IPlainCardProps['theme'];
  @Input() trapFocus: IPlainCardProps['trapFocus'];
  @Input() renderPlainCard?: InputRendererOptions<IPlainCardProps>;

  @Output() readonly onEnter = new EventEmitter<void>();
  @Output() readonly onLeave = new EventEmitter<void>();

  onRenderPlainCard: (props?: IPlainCardProps, defaultRender?: JsxRenderFunc<IPlainCardProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });
  }

  ngOnInit() {
    this.onRenderPlainCard = this.createRenderPropHandler(this.renderPlainCard);
  }
}
