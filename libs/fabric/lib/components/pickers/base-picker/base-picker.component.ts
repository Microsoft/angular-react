// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, Omit, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectorRef, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, Renderer2 } from '@angular/core';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import {
  BaseAutoFill,
  IBasePickerProps,
  IBasePickerSuggestionsProps,
  IPickerItemProps,
} from 'office-ui-fabric-react/lib/Pickers';
import { omit } from '@angular-react/fabric/lib/utils';

export abstract class FabBasePickerComponent<T, TProps extends IBasePickerProps<T>>
  extends ReactWrapperComponent<TProps>
  implements OnInit {
  @Input() componentRef?: IBasePickerProps<T>['componentRef'];
  @Input() resolveDelay?: IBasePickerProps<T>['resolveDelay'];
  @Input() defaultSelectedItems?: IBasePickerProps<T>['defaultSelectedItems'];
  @Input() getTextFromItem?: IBasePickerProps<T>['getTextFromItem'];
  @Input() className?: IBasePickerProps<T>['className'];
  @Input() pickerCalloutProps?: IBasePickerProps<T>['pickerCalloutProps'];
  @Input() searchingText?: IBasePickerProps<T>['searchingText'];
  @Input() disabled?: IBasePickerProps<T>['disabled'];
  @Input() itemLimit?: IBasePickerProps<T>['itemLimit'];
  @Input() createGenericItem?: IBasePickerProps<T>['createGenericItem'];
  @Input() removeButtonAriaLabel?: IBasePickerProps<T>['removeButtonAriaLabel'];
  @Input() selectedItems?: IBasePickerProps<T>['selectedItems'];
  @Input() enableSelectedSuggestionAlert?: IBasePickerProps<T>['enableSelectedSuggestionAlert'];
  @Input() inputProps?: IBasePickerProps<T>['inputProps'];
  @Input('itemSelected') onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;
  @Input('inputChange') onInputChange?: (input: string) => string;
  @Input('emptyInputFocus') onEmptyInputFocus?: IBasePickerProps<T>['onEmptyInputFocus'];
  @Input('resolveSuggestions') onResolveSuggestions: IBasePickerProps<T>['onResolveSuggestions'];
  @Input('getMoreResults') onGetMoreResults?: IBasePickerProps<T>['onGetMoreResults'];
  @Input('validateInput') onValidateInput?: IBasePickerProps<T>['onValidateInput'];

  @Input()
  set pickerSuggestionsOptions(value: IBasePickerSuggestionsOptions) {
    this._pickerSuggestionsOptions = value;

    if (value) {
      this.pickerSuggestionsProps = this._transformBasePickerSuggestionsOptionsToProps(value);
    }
  }

  get pickerSuggestionsOptions(): IBasePickerSuggestionsOptions {
    return this._pickerSuggestionsOptions;
  }

  @Input() renderItem?: InputRendererOptions<IPickerItemProps<T>>;
  @Input() renderSuggestionsItem?: InputRendererOptions<IRenderSuggestionItemContext<T>>;

  @Output() readonly onChange = new EventEmitter<{ items?: T[] }>();
  @Output() readonly onFocus = new EventEmitter<FocusEvent>();
  @Output() readonly onBlur = new EventEmitter<FocusEvent>();
  @Output() readonly onDismiss = new EventEmitter<{ ev?: any; selectedItem?: T }>();
  @Output() readonly onRemoveSuggestion = new EventEmitter<{ item: IPersonaProps }>();

  pickerSuggestionsProps: IBasePickerSuggestionsProps;
  onRenderSuggestionsItem: (
    props?: IRenderSuggestionItemContext<T>,
    defaultRender?: JsxRenderFunc<IRenderSuggestionItemContext<T>>
  ) => JSX.Element;
  onRenderItem: (props?: IPickerItemProps<T>, defaultRender?: JsxRenderFunc<IPickerItemProps<T>>) => JSX.Element;

  private _pickerSuggestionsOptions: IBasePickerSuggestionsOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onDismissHandler = this.onDismissHandler.bind(this);
    this.onRemoveSuggestionHandler = this.onRemoveSuggestionHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderItem = this.createRenderPropHandler(this.renderItem);
    this.onRenderSuggestionsItem = this.createRenderPropHandler(this.renderSuggestionsItem);
  }

  onChangeHandler(items?: T[]) {
    this.onChange.emit({
      items,
    });
  }

  onFocusHandler(event: React.FocusEvent<HTMLInputElement | BaseAutoFill>) {
    this.onFocus.emit(event.nativeEvent);
  }

  onBlurHandler(event: React.FocusEvent<HTMLInputElement | BaseAutoFill>) {
    this.onBlur.emit(event.nativeEvent);
  }

  onDismissHandler(ev?: any, selectedItem?: T) {
    this.onDismiss.emit({
      ev: (ev && ev.nativeEvent) || ev,
      selectedItem,
    });
  }

  onRemoveSuggestionHandler(item: IPersonaProps) {
    this.onRemoveSuggestion.emit({
      item,
    });
  }

  private _transformBasePickerSuggestionsOptionsToProps(
    options: IBasePickerSuggestionsOptions
  ): IBasePickerSuggestionsProps {
    const sharedProperties = omit(options, 'renderNoResultFound', 'renderResultsFooterFull', 'renderResultsFooter');

    const noResultFoundRenderer = this.createInputJsxRenderer(options.renderNoResultFound);
    const resultsFooterFullRenderer = this.createInputJsxRenderer(options.renderResultsFooterFull);
    const resultsFooterRenderer = this.createInputJsxRenderer(options.renderResultsFooter);

    return Object.assign(
      {},
      sharedProperties,
      noResultFoundRenderer &&
        ({ onRenderNoResultFound: () => noResultFoundRenderer({}) } as Pick<
          IBasePickerSuggestionsProps,
          'onRenderNoResultFound'
        >),
      resultsFooterFullRenderer &&
        ({ resultsFooterFull: () => resultsFooterFullRenderer({}) } as Pick<
          IBasePickerSuggestionsProps,
          'resultsFooterFull'
        >),
      resultsFooterRenderer &&
        ({ resultsFooter: () => resultsFooterRenderer({}) } as Pick<IBasePickerSuggestionsProps, 'resultsFooter'>)
    );
  }
}

export interface IBasePickerSuggestionsOptions
  extends Omit<IBasePickerSuggestionsProps, 'onRenderNoResultFound' | 'resultsFooterFull' | 'resultsFooter'> {
  readonly renderNoResultFound: InputRendererOptions<{}>;
  readonly renderResultsFooterFull: InputRendererOptions<{}>;
  readonly renderResultsFooter: InputRendererOptions<{}>;
}

export interface IRenderSuggestionItemContext<T> {
  readonly props: T;
  readonly itemProps: any;
}
