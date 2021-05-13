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
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';
import { omit } from '@angular-react/fabric/lib/utils';

@Component({
  selector: 'fab-search-box',
  exportAs: 'fabSearchBox',
  template: `
    <SearchBox
      #reactNode
      [componentRef]="componentRef"
      [placeholder]="placeholder"
      [value]="value"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [clearButtonProps]="clearButtonProps"
      [iconProps]="iconProps"
      [underlined]="underlined"
      [theme]="theme"
      [styles]="styles"
      [disableAnimation]="disableAnimation"
      [Change]="onChangeHandler"
      [Search]="onSearchHandler"
      [Clear]="onClearHandler"
      [Escape]="onEscapeHandler"
    >
    </SearchBox>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSearchBoxComponent extends ReactWrapperComponent<ISearchBoxProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISearchBoxProps['componentRef'];
  @Input() placeholder?: ISearchBoxProps['placeholder'];
  @Input() value?: ISearchBoxProps['value'];
  @Input() className?: ISearchBoxProps['className'];
  @Input() ariaLabel?: ISearchBoxProps['ariaLabel'];
  @Input() underlined?: ISearchBoxProps['underlined'];
  @Input() theme?: ISearchBoxProps['theme'];
  @Input() styles?: ISearchBoxProps['styles'];
  @Input() disableAnimation?: ISearchBoxProps['disableAnimation'];
  @Input()
  set clearButtonOptions(value: IButtonOptions) {
    this._clearButtonOptions = value;

    if (value) {
      this.clearButtonProps = this._transformButtonOptionsToProps(value);
    }
  }

  get clearButtonOptions(): IButtonOptions {
    return this._clearButtonOptions;
  }

  @Input() iconProps?: ISearchBoxProps['iconProps'];

  @Output() readonly onChange = new EventEmitter<{ newValue: any }>();
  @Output() readonly onSearch = new EventEmitter<{ newValue: any }>();
  @Output() readonly onClear = new EventEmitter<{ ev?: any }>();
  @Output() readonly onEscape = new EventEmitter<{ ev?: any }>();

  clearButtonProps: IButtonProps;

  private _clearButtonOptions: IButtonOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
    this.onEscapeHandler = this.onEscapeHandler.bind(this);
  }

  onChangeHandler(newValue: any) {
    this.onChange.emit({
      newValue,
    });
  }

  onSearchHandler(newValue: any) {
    this.onSearch.emit({
      newValue,
    });
  }

  onClearHandler(ev?: any) {
    this.onClear.emit({
      ev: (ev && ev.nativeElement) || ev,
    });
  }

  onEscapeHandler(ev?: any) {
    this.onEscape.emit({
      ev: (ev && ev.nativeElement) || ev,
    });
  }

  private _transformButtonOptionsToProps(options: IButtonOptions): IButtonProps {
    const sharedProperties = omit(
      options,
      'renderIcon',
      'renderText',
      'renderDescription',
      'renderAriaDescription',
      'renderChildren',
      'renderMenuIcon'
    );

    const iconRenderer = this.createInputJsxRenderer(options.renderIcon);
    const textRenderer = this.createInputJsxRenderer(options.renderText);
    const descriptionRenderer = this.createInputJsxRenderer(options.renderDescription);
    const ariaDescriptionRenderer = this.createInputJsxRenderer(options.renderAriaDescription);
    const childrenRenderer = this.createInputJsxRenderer(options.renderChildren);
    const menuIconRenderer = this.createInputJsxRenderer(options.renderMenuIcon);

    return Object.assign(
      {},
      sharedProperties,
      iconRenderer && ({ onRenderIcon: props => iconRenderer(props) } as Pick<IButtonProps, 'onRenderIcon'>),
      textRenderer && ({ onRenderText: props => textRenderer(props) } as Pick<IButtonProps, 'onRenderText'>),
      descriptionRenderer &&
        ({ onRenderDescription: props => descriptionRenderer(props) } as Pick<IButtonProps, 'onRenderDescription'>),
      ariaDescriptionRenderer &&
        ({ onRenderAriaDescription: props => ariaDescriptionRenderer(props) } as Pick<
          IButtonProps,
          'onRenderAriaDescription'
        >),
      childrenRenderer &&
        ({ onRenderChildren: props => childrenRenderer(props) } as Pick<IButtonProps, 'onRenderChildren'>),
      menuIconRenderer &&
        ({ onRenderMenuIcon: props => menuIconRenderer(props) } as Pick<IButtonProps, 'onRenderMenuIcon'>)
    );
  }
}

export interface IButtonOptions
  extends Omit<
    IButtonProps,
    | 'onRenderIcon'
    | 'onRenderText'
    | 'onRenderDescription'
    | 'onRenderAriaDescription'
    | 'onRenderChildren'
    | 'onRenderMenuIcon'
  > {
  readonly renderIcon: InputRendererOptions<IButtonProps>;
  readonly renderText: InputRendererOptions<IButtonProps>;
  readonly renderDescription: InputRendererOptions<IButtonProps>;
  readonly renderAriaDescription: InputRendererOptions<IButtonProps>;
  readonly renderChildren: InputRendererOptions<IButtonProps>;
  readonly renderMenuIcon: InputRendererOptions<IButtonProps>;
}
