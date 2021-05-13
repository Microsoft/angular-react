// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
} from '@angular/core';
import { IDropdownProps, IDropdownOption, IDropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ISelectableDroppableTextProps, ISelectableOption } from 'office-ui-fabric-react/lib/SelectableOption';
import { DropdownOptionsDirective } from './directives/dropdown-options.directive';

@Component({
  selector: 'fab-dropdown',
  exportAs: 'fabDropdown',
  template: `
    <Dropdown
      #reactNode
      [componentRef]="componentRef"
      [label]="label"
      [ariaLabel]="ariaLabel"
      [id]="id"
      [className]="className"
      [defaultSelectedKey]="defaultSelectedKey"
      [selectedKey]="selectedKey"
      [disabled]="disabled"
      [required]="required"
      [calloutProps]="calloutProps"
      [panelProps]="panelProps"
      [errorMessage]="errorMessage"
      [placeholder]="placeholder"
      [openOnKeyboardFocus]="openOnKeyboardFocus"
      [options]="options"
      [dropdownWidth]="dropdownWidth"
      [responsiveMode]="responsiveMode"
      [multiSelect]="multiSelect"
      [defaultSelectedKeys]="defaultSelectedKeys"
      [selectedKeys]="selectedKeys"
      [multiSelectDelimiter]="multiSelectDelimiter"
      [notifyOnReselect]="notifyOnReselect"
      [keytipProps]="keytipProps"
      [theme]="theme"
      [styles]="styles"
      [RenderContainer]="renderContainer && onRenderContainer"
      [RenderList]="renderList && onRenderList"
      [RenderItem]="renderItem && onRenderItem"
      [RenderOption]="renderOption && onRenderOption"
      [RenderPlaceholder]="renderPlaceholder && onRenderPlaceholder"
      [RenderPlaceHolder]="renderPlaceHolder && onRenderPlaceHolder"
      [RenderTitle]="renderTitle && onRenderTitle"
      [RenderCaretDown]="renderCaretDown && onRenderCaretDown"
      [Change]="onChangeHandler"
      [Dismiss]="onDismissHandler"
    ></Dropdown>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDropdownComponent extends ReactWrapperComponent<IDropdownProps> implements OnInit, AfterContentInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;
  @ContentChild(DropdownOptionsDirective, { static: true }) readonly dropdownOptionsDirective?: DropdownOptionsDirective;

  @Input() componentRef?: IDropdownProps['componentRef'];
  @Input() label?: IDropdownProps['label'];
  @Input() ariaLabel?: IDropdownProps['ariaLabel'];
  @Input() id?: IDropdownProps['id'];
  @Input() className?: IDropdownProps['className'];
  @Input() defaultSelectedKey?: IDropdownProps['defaultSelectedKey'];
  @Input() selectedKey?: IDropdownProps['selectedKey'];
  @Input() disabled?: IDropdownProps['disabled'];
  @Input() required?: IDropdownProps['required'];
  @Input() calloutProps?: IDropdownProps['calloutProps'];
  @Input() panelProps?: IDropdownProps['panelProps'];
  @Input() errorMessage?: IDropdownProps['errorMessage'];
  @Input() placeholder?: IDropdownProps['placeholder'];
  @Input() openOnKeyboardFocus?: IDropdownProps['openOnKeyboardFocus'];

  @Input() options: IDropdownProps['options'];
  @Input() dropdownWidth?: IDropdownProps['dropdownWidth'];
  @Input() responsiveMode?: IDropdownProps['responsiveMode'];
  @Input() multiSelect?: IDropdownProps['multiSelect'];
  @Input() defaultSelectedKeys?: IDropdownProps['defaultSelectedKeys'];
  @Input() selectedKeys?: IDropdownProps['selectedKeys'];
  @Input() multiSelectDelimiter?: IDropdownProps['multiSelectDelimiter'];
  @Input() notifyOnReselect?: IDropdownProps['notifyOnReselect'];
  @Input() keytipProps?: IDropdownProps['keytipProps'];
  @Input() theme?: IDropdownProps['theme'];
  @Input() styles?: IDropdownProps['styles'];

  @Input() renderContainer?: InputRendererOptions<ISelectableDroppableTextProps<IDropdown, IDropdown>>;
  @Input() renderList?: InputRendererOptions<ISelectableDroppableTextProps<IDropdown, IDropdown>>;
  @Input() renderItem?: InputRendererOptions<ISelectableOption>;
  @Input() renderOption?: InputRendererOptions<ISelectableOption>;
  @Input() renderPlaceholder?: InputRendererOptions<IDropdownProps>;
  @Input() renderPlaceHolder?: InputRendererOptions<IDropdownProps>;
  @Input() renderTitle?: InputRendererOptions<IDropdownOption | IDropdownOption[]>;
  @Input() renderCaretDown?: InputRendererOptions<IDropdownProps>;

  @Output() readonly onChange = new EventEmitter<{ event: Event; option?: IDropdownOption; index?: number }>();
  @Output() readonly onDismiss = new EventEmitter<void>();

  onRenderContainer: (
    props?: ISelectableDroppableTextProps<IDropdown, IDropdown>,
    defaultRender?: JsxRenderFunc<ISelectableDroppableTextProps<IDropdown, IDropdown>>
  ) => JSX.Element;
  onRenderList: (
    props?: ISelectableDroppableTextProps<IDropdown, IDropdown>,
    defaultRender?: JsxRenderFunc<ISelectableDroppableTextProps<IDropdown, IDropdown>>
  ) => JSX.Element;
  onRenderItem: (props?: ISelectableOption, defaultRender?: JsxRenderFunc<ISelectableOption>) => JSX.Element;
  onRenderOption: (props?: ISelectableOption, defaultRender?: JsxRenderFunc<ISelectableOption>) => JSX.Element;
  onRenderPlaceholder: (props?: IDropdownProps, defaultRender?: JsxRenderFunc<IDropdownProps>) => JSX.Element;
  onRenderPlaceHolder: (props?: IDropdownProps, defaultRender?: JsxRenderFunc<IDropdownProps>) => JSX.Element;
  onRenderTitle: (
    props?: IDropdownOption | IDropdownOption[],
    defaultRender?: JsxRenderFunc<IDropdownOption | IDropdownOption[]>
  ) => JSX.Element;
  onRenderCaretDown: (props?: IDropdownProps, defaultRender?: JsxRenderFunc<IDropdownProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, { setHostDisplay: true });

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onDismissHandler = this.onDismissHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderContainer = this.createRenderPropHandler(this.renderContainer);
    this.onRenderList = this.createRenderPropHandler(this.renderList);
    this.onRenderItem = this.createRenderPropHandler(this.renderItem);
    this.onRenderOption = this.createRenderPropHandler(this.renderOption);
    this.onRenderPlaceholder = this.createRenderPropHandler(this.renderPlaceholder);
    this.onRenderPlaceHolder = this.createRenderPropHandler(this.renderPlaceHolder);
    this.onRenderTitle = this.createRenderPropHandler(this.renderTitle);
    this.onRenderCaretDown = this.createRenderPropHandler(this.renderCaretDown);
  }

  ngAfterContentInit() {
    if (this.dropdownOptionsDirective) {
      this._initDirective(this.dropdownOptionsDirective);
    }
    super.ngAfterContentInit();
  }

  onChangeHandler(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
    this.onChange.emit({
      event: event && event.nativeEvent,
      option,
      index,
    });
  }

  onDismissHandler() {
    this.onDismiss.emit();
  }

  private _initDirective(directive: DropdownOptionsDirective) {
    this.options = directive.items;
    this.markForCheck();
  }
}
