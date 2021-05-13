// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent, InputRendererOptions, JsxRenderFunc } from '@angular-react/core';
import {
  ChangeDetectorRef,
  EventEmitter,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  OnInit,
  Output,
} from '@angular/core';
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

export class FabBaseTextFieldComponent extends ReactWrapperComponent<ITextFieldProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() required?: ITextFieldProps['required'];
  @Input() placeholder?: ITextFieldProps['placeholder'];
  @Input() type?: ITextFieldProps['type'];
  @Input() cols?: ITextFieldProps['cols'];
  @Input() colSpan?: ITextFieldProps['colSpan'];
  @Input() rows?: ITextFieldProps['rows'];
  @Input() rowSpan?: ITextFieldProps['rowSpan'];
  @Input() min?: ITextFieldProps['min'];
  @Input() max?: ITextFieldProps['max'];
  @Input() pattern?: ITextFieldProps['pattern'];
  @Input('for') htmlFor?: ITextFieldProps['htmlFor'];

  @Input() componentRef?: ITextFieldProps['componentRef'];
  @Input() multiline?: ITextFieldProps['multiline'];
  @Input() resizable?: ITextFieldProps['resizable'];
  @Input() autoAdjustHeight?: ITextFieldProps['autoAdjustHeight'];
  @Input() underlined?: ITextFieldProps['underlined'];
  @Input() borderless?: ITextFieldProps['borderless'];
  @Input() label?: ITextFieldProps['label'];
  @Input() description?: ITextFieldProps['description'];
  @Input() prefix?: ITextFieldProps['prefix'];
  @Input() suffix?: ITextFieldProps['suffix'];
  @Input() iconProps?: ITextFieldProps['iconProps'];
  @Input() defaultValue?: ITextFieldProps['defaultValue'];
  @Input() value?: ITextFieldProps['value'];
  @Input() disabled?: ITextFieldProps['disabled'];
  @Input() readOnly?: ITextFieldProps['readOnly'];
  @Input() errorMessage?: ITextFieldProps['errorMessage'];
  @Input() deferredValidationTime?: ITextFieldProps['deferredValidationTime'];
  @Input() className?: ITextFieldProps['className'];
  @Input() inputClassName?: ITextFieldProps['inputClassName'];
  @Input() ariaLabel?: ITextFieldProps['ariaLabel'];
  @Input() validateOnFocusIn?: ITextFieldProps['validateOnFocusIn'];
  @Input() validateOnFocusOut?: ITextFieldProps['validateOnFocusOut'];
  @Input() validateOnLoad?: ITextFieldProps['validateOnLoad'];
  @Input() theme?: ITextFieldProps['theme'];
  @Input() styles?: ITextFieldProps['styles'];
  @Input() autoComplete?: ITextFieldProps['autoComplete'];
  @Input() mask?: ITextFieldProps['mask'];
  @Input() maskChar?: ITextFieldProps['maskChar'];
  @Input() maskFormat?: ITextFieldProps['maskFormat'];
  @Input() getErrorMessage?: ITextFieldProps['onGetErrorMessage'];

  @Input() renderLabel?: InputRendererOptions<ITextFieldProps>;
  @Input() renderDescription?: InputRendererOptions<ITextFieldProps>;
  @Input() renderPrefix?: InputRendererOptions<ITextFieldProps>;
  @Input() renderSuffix?: InputRendererOptions<ITextFieldProps>;

  @Input() maxLength: number;

  @Output() readonly onClick = new EventEmitter<MouseEvent>();
  @Output() readonly onFocus = new EventEmitter<FocusEvent>();
  @Output() readonly onBlur = new EventEmitter<Event>();

  @Output() readonly onChange = new EventEmitter<{ event: Event; newValue?: string }>();
  @Output() readonly onBeforeChange = new EventEmitter<{ newValue?: string }>();
  @Output() readonly onNotifyValidationResult = new EventEmitter<{ errorMessage: string | JSX.Element; value: string | undefined }>();

  /* Non-React props, more native support for Angular */
  // support for two-way data binding for `@Input() checked`.
  @Output() readonly valueChange = new EventEmitter<string>();

  onRenderLabel: (props?: ITextFieldProps, defaultRender?: JsxRenderFunc<ITextFieldProps>) => JSX.Element;
  onRenderDescription: (props?: ITextFieldProps, defaultRender?: JsxRenderFunc<ITextFieldProps>) => JSX.Element;
  onRenderPrefix: (props?: ITextFieldProps, defaultRender?: JsxRenderFunc<ITextFieldProps>) => JSX.Element;
  onRenderSuffix: (props?: ITextFieldProps, defaultRender?: JsxRenderFunc<ITextFieldProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, { setHostDisplay: true });

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBeforeChangeHandler = this.onBeforeChangeHandler.bind(this);
    this.onNotifyValidationResultHandler = this.onNotifyValidationResultHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderLabel = this.createRenderPropHandler(this.renderLabel);
    this.onRenderDescription = this.createRenderPropHandler(this.renderDescription);
    this.onRenderPrefix = this.createRenderPropHandler(this.renderPrefix);
    this.onRenderSuffix = this.createRenderPropHandler(this.renderSuffix);
  }

  onClickHandler(ev?: React.MouseEvent) {
    this.onClick.emit(ev && ev.nativeEvent);
  }

  onFocusHandler(ev?: React.FocusEvent) {
    this.onFocus.emit(ev && ev.nativeEvent);
  }

  onBlurHandler(ev?: React.SyntheticEvent) {
    this.onBlur.emit(ev && ev.nativeEvent);
  }

  onChangeHandler(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
    this.onChange.emit({ event: event.nativeEvent, newValue });
    this.valueChange.emit(newValue);
  }

  onBeforeChangeHandler(newValue: any) {
    this.onBeforeChange.emit({ newValue });
  }

  onNotifyValidationResultHandler(errorMessage: string, value: string | undefined) {
    this.onNotifyValidationResult.emit({ errorMessage, value });
  }
}
