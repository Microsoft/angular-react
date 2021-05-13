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
import { IChoiceGroupOption, IChoiceGroupProps } from 'office-ui-fabric-react/lib/ChoiceGroup';

@Component({
  selector: 'fab-choice-group',
  exportAs: 'fabChoiceGroup',
  template: `
    <ChoiceGroup
      #reactNode
      [componentRef]="componentRef"
      [options]="options"
      [defaultSelectedKey]="defaultSelectedKey"
      [selectedKey]="selectedKey"
      [label]="label"
      [required]="required"
      [theme]="theme"
      [styles]="styles"
      [ariaLabelledBy]="ariaLabelledBy"
      [Changed]="onChangedHandler"
      [Change]="onChangeHandler"
    >
    </ChoiceGroup>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabChoiceGroupComponent extends ReactWrapperComponent<IChoiceGroupProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IChoiceGroupProps['componentRef'];
  @Input() options?: IChoiceGroupProps['options'];
  @Input() defaultSelectedKey?: IChoiceGroupProps['defaultSelectedKey'];
  @Input() selectedKey?: IChoiceGroupProps['selectedKey'];
  @Input() label?: IChoiceGroupProps['label'];
  @Input() theme?: IChoiceGroupProps['theme'];
  @Input() styles?: IChoiceGroupProps['styles'];
  @Input() ariaLabelledBy?: IChoiceGroupProps['ariaLabelledBy'];

  /** HTML Input props */
  @Input() required?: IChoiceGroupProps['required'];

  @Output() readonly onChanged = new EventEmitter<{ option: IChoiceGroupOption; evt?: Event }>();
  @Output() readonly onChange = new EventEmitter<{ ev?: Event; option?: IChoiceGroupOption }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    this.onChangedHandler = this.onChangedHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangedHandler(option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) {
    this.onChanged.emit({
      option,
      evt: evt && evt.nativeEvent,
    });
  }

  onChangeHandler(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) {
    this.onChange.emit({
      ev: ev && ev.nativeEvent,
      option,
    });
  }
}
