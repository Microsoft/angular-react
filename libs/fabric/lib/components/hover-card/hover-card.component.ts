// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, Omit, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IExpandingCardProps, IHoverCardProps, IPlainCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { omit } from '@angular-react/fabric/lib/utils';

@Component({
  selector: 'fab-hover-card',
  exportAs: 'fabHoverCard',
  template: `
    <HoverCard
      #reactNode
      [componentRef]="componentRef"
      [className]="className"
      [theme]="theme"
      [type]="type"
      [expandingCardProps]="transformedExpandingCardProps"
      [plainCardProps]="transformedPlainCardProps"
      [setAriaDescribedBy]="setAriaDescribedBy"
      [cardOpenDelay]="cardOpenDelay"
      [cardDismissDelay]="cardDismissDelay"
      [expandedCardOpenDelay]="expandedCardOpenDelay"
      [sticky]="sticky"
      [instantOpenOnClick]="instantOpenOnClick"
      [styles]="styles"
      [target]="target"
      [eventListenerTarget]="eventListenerTarget"
      [trapFocus]="trapFocus"
      [shouldBlockHoverCard]="shouldBlockHoverCard"
      [setInitialFocus]="setInitialFocus"
      [openHotKey]="openHotKey"
      (onCardVisible)="onCardVisible.emit()"
      (onCardHide)="onCardHide.emit()"
      (onCardExpand)="onCardExpand.emit()"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </HoverCard>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabHoverCardComponent extends ReactWrapperComponent<IHoverCardProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IHoverCardProps['componentRef'];
  @Input() className?: IHoverCardProps['className'];
  @Input() theme?: IHoverCardProps['theme'];
  @Input() type?: IHoverCardProps['type'];
  @Input() setAriaDescribedBy?: IHoverCardProps['setAriaDescribedBy'];
  @Input() cardOpenDelay?: IHoverCardProps['cardOpenDelay'];
  @Input() cardDismissDelay?: IHoverCardProps['cardDismissDelay'];
  @Input() expandedCardOpenDelay?: IHoverCardProps['expandedCardOpenDelay'];
  @Input() sticky?: IHoverCardProps['sticky'];
  @Input() instantOpenOnClick?: IHoverCardProps['instantOpenOnClick'];
  @Input() styles?: IHoverCardProps['styles'];
  @Input() target?: IHoverCardProps['target'];
  @Input() eventListenerTarget?: IHoverCardProps['eventListenerTarget'];
  @Input() trapFocus?: IHoverCardProps['trapFocus'];
  @Input() shouldBlockHoverCard?: () => boolean; // Workaround for bug in the Fabric React types (() => void)
  @Input() setInitialFocus?: IHoverCardProps['setInitialFocus'];
  @Input() openHotKey?: IHoverCardProps['openHotKey'];
  @Input()
  set expandingCardOptions(value: IExpandingCardOptions) {
    this._expandingCardOptions = value;
    if (value) {
      this.transformedExpandingCardProps = this._transformExpandingCardOptionsToProps(value);
    }
  }

  get expandingCardOptions(): IExpandingCardOptions {
    return this._expandingCardOptions;
  }

  @Input() set plainCardOptions(value: IPlainCardOptions) {
    this._plainCardOptions = value;
    if (value) {
      this.transformedPlainCardProps = this._transformPlainCardOptionsToProps(value);
    }
  }

  get plainCardOptions(): IPlainCardOptions {
    return this._plainCardOptions;
  }

  @Output() readonly onCardVisible = new EventEmitter<void>();
  @Output() readonly onCardHide = new EventEmitter<void>();
  @Output() readonly onCardExpand = new EventEmitter<void>();

  transformedExpandingCardProps: IExpandingCardProps;
  private _expandingCardOptions: IExpandingCardOptions;

  transformedPlainCardProps: IPlainCardProps;
  private _plainCardOptions: IPlainCardOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });
  }

  private _transformExpandingCardOptionsToProps(options: IExpandingCardOptions): IExpandingCardProps {
    const sharedProperties = omit(options, 'renderCompactCard', 'renderExpandedCard');

    const compactCardRenderer = this.createInputJsxRenderer(options.renderCompactCard);
    const expandedCardRenderer = this.createInputJsxRenderer(options.renderExpandedCard);

    return Object.assign(
      {},
      sharedProperties,
      compactCardRenderer &&
      ({ onRenderCompactCard: data => compactCardRenderer({ data }) } as Pick<
        IExpandingCardProps,
        'onRenderCompactCard'
      >),
      expandedCardRenderer &&
      ({ onRenderExpandedCard: data => expandedCardRenderer({ data }) } as Pick<
        IExpandingCardProps,
        'onRenderExpandedCard'
      >)
    );
  }

  private _transformPlainCardOptionsToProps(options: IPlainCardOptions): IPlainCardProps {
    const sharedProperties = omit(options, 'renderPlainCard');

    const plainCardRenderer = this.createInputJsxRenderer(options.renderPlainCard);

    return Object.assign(
      {},
      sharedProperties,
      plainCardRenderer &&
      ({ onRenderPlainCard: data => plainCardRenderer({ data }) } as Pick<IPlainCardProps, 'onRenderPlainCard'>)
    );
  }
}

/**
 * Counterpart of `IExpandingCardProps`, with Angular adjustments.
 */
export interface IExpandingCardOptions
  extends Omit<IExpandingCardProps, 'onRenderCompactCard' | 'onRenderExpandedCard'> {
  readonly renderCompactCard?: InputRendererOptions<RenderCardContext<IExpandingCardProps>>;
  readonly renderExpandedCard?: InputRendererOptions<RenderCardContext<IExpandingCardProps>>;
}

export interface IPlainCardOptions extends Omit<IPlainCardProps, 'onRenderPlainCard'> {
  readonly renderPlainCard?: InputRendererOptions<RenderCardContext<IPlainCardProps>>;
}

export interface RenderCardContext<T = any> {
  readonly data: T;
}
