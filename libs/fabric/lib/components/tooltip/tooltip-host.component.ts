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
import { ITooltipHostProps, ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
import { omit } from '@angular-react/fabric/lib/utils';

@Component({
  selector: 'fab-tooltip-host',
  exportAs: 'fabTooltipHost',
  template: `
    <TooltipHost
      #reactNode
      [theme]="theme"
      [componentRef]="componentRef"
      [calloutProps]="calloutProps"
      [closeDelay]="closeDelay"
      [setAriaDescribedBy]="setAriaDescribedBy"
      [delay]="delay"
      [content]="content"
      [directionalHint]="directionalHint"
      [directionalHintForRTL]="directionalHintForRTL"
      [overflowMode]="overflowMode"
      [hostClassName]="hostClassName"
      [tooltipProps]="transformedTooltipProps"
      [TooltipToggle]="onTooltipToggleHandler"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </TooltipHost>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTooltipHostComponent extends ReactWrapperComponent<ITooltipHostProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ITooltipHostProps['componentRef'];
  @Input() closeDelay?: ITooltipHostProps['closeDelay'];
  @Input() calloutProps?: ITooltipHostProps['calloutProps'];
  @Input() content?: ITooltipHostProps['content'];
  @Input() delay?: ITooltipHostProps['delay'];
  @Input() directionalHint?: ITooltipHostProps['directionalHint'];
  @Input() directionalHintForRTL?: ITooltipHostProps['directionalHintForRTL'];
  @Input() hostClassName?: ITooltipHostProps['hostClassName'];
  @Input() overflowMode?: ITooltipHostProps['overflowMode'];
  @Input() setAriaDescribedBy?: ITooltipHostProps['setAriaDescribedBy'];
  @Input() theme?: ITooltipHostProps['theme'];

  @Input()
  set tooltipOptions(value: ITooltipOptions) {
    this._tooltipOptions = value;
    if (value) {
      this.transformedTooltipProps = this._transformTooltipOptionsToProps(value);
    }
  }

  get tooltipOptions(): ITooltipOptions {
    return this._tooltipOptions;
  }

  @Output() readonly onTooltipToggle = new EventEmitter<{ isTooltipVisible: boolean }>();

  transformedTooltipProps: ITooltipHostProps['tooltipProps'];
  private _tooltipOptions: ITooltipOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });

    this.onTooltipToggleHandler = this.onTooltipToggleHandler.bind(this);
  }

  onTooltipToggleHandler(isTooltipVisible: boolean) {
    this.onTooltipToggle.emit({ isTooltipVisible });
  }

  private _transformTooltipOptionsToProps(options: ITooltipOptions): ITooltipProps {
    const sharedProperties = omit(options, 'renderContent');

    const contentRenderer = this.createInputJsxRenderer(options.renderContent);

    return Object.assign(
      {},
      sharedProperties,
      contentRenderer && ({ onRenderContent: data => contentRenderer(data) } as Pick<ITooltipProps, 'onRenderContent'>)
    );
  }
}

/**
 * Counterpart of `ITooltipProps`, with Angular adjustments.
 */
export interface ITooltipOptions extends Omit<ITooltipProps, 'onRenderContent'> {
  readonly renderContent?: InputRendererOptions<ITooltipProps>;
}
