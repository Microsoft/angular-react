// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent, JsxRenderFunc, InputRendererOptions } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  OnInit,
} from '@angular/core';
import { IProgressIndicatorProps } from 'office-ui-fabric-react/lib/ProgressIndicator';

@Component({
  selector: 'fab-progress-indicator',
  exportAs: 'fabProgressIndicator',
  template: `
    <ProgressIndicator
      #reactNode
      [ariaValueText]="ariaValueText"
      [barHeight]="barHeight"
      [className]="className"
      [description]="description"
      [label]="label"
      [RenderProgress]="renderProgress && onRenderProgress"
      [percentComplete]="percentComplete"
      [progressHidden]="progressHidden"
      [styles]="styles"
      [theme]="theme"
    >
    </ProgressIndicator>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabProgressIndicatorComponent extends ReactWrapperComponent<IProgressIndicatorProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() ariaValueText?: IProgressIndicatorProps['ariaValueText'];
  @Input() barHeight?: IProgressIndicatorProps['barHeight'];
  @Input() className?: IProgressIndicatorProps['className'];
  @Input() renderProgress?: InputRendererOptions<IProgressIndicatorProps>;
  @Input() percentComplete?: IProgressIndicatorProps['percentComplete'];
  @Input() progressHidden?: IProgressIndicatorProps['progressHidden'];
  @Input() styles?: IProgressIndicatorProps['styles'];
  @Input() theme?: IProgressIndicatorProps['theme'];

  @Input()
  set renderDescription(value: InputRendererOptions<{}>) {
    this._renderDescription = value;

    if (value) {
      this.description = this.createInputJsxRenderer(value)({});
    }
  }

  get renderDescription(): InputRendererOptions<{}> {
    return this._renderDescription;
  }

  description?: React.ReactNode;
  private _renderDescription?: InputRendererOptions<{}>;

  @Input()
  set renderLabel(value: InputRendererOptions<{}>) {
    this._renderLabel = value;

    if (value) {
      this.label = this.createInputJsxRenderer(value)({});
    }
  }

  get renderLabel(): InputRendererOptions<{}> {
    return this._renderLabel;
  }

  label?: React.ReactNode;
  private _renderLabel?: InputRendererOptions<{}>;

  onRenderProgress: (props?: IProgressIndicatorProps, defaultRender?: JsxRenderFunc<IProgressIndicatorProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }

  ngOnInit() {
    this.onRenderProgress = this.createRenderPropHandler(this.renderProgress);
  }
}
