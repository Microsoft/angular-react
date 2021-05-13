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
import { IToggleProps } from 'office-ui-fabric-react/lib/Toggle';

@Component({
  selector: 'fab-toggle',
  exportAs: 'fabToggle',
  template: `
    <Toggle
      #reactNode
      [componentRef]="componentRef"
      [label]="label"
      [Text]="onText"
      [offText]="offText"
      [ariaLabel]="ariaLabel"
      [checked]="checked"
      [defaultChecked]="defaultChecked"
      [disabled]="disabled"
      [inlineLabel]="inlineLabel"
      [theme]="theme"
      [styles]="styles"
      [keytipProps]="keytipProps"
      [Change]="onChangeHandler"
    >
    </Toggle>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabToggleComponent extends ReactWrapperComponent<IToggleProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() as?: IToggleProps['as'];
  @Input() componentRef?: IToggleProps['componentRef'];
  @Input() label?: IToggleProps['label'];

  /**
   * Counterpart of `IToggleProps['onText']`.
   * Angular doesn't allow Inputs to be prefixed with "on", so this is misspelled as "onn".
   */
  @Input('onnText') onText?: IToggleProps['onText'];
  @Input() offText?: IToggleProps['offText'];
  @Input() ariaLabel?: IToggleProps['ariaLabel'];

  @Input() checked?: IToggleProps['checked'];
  @Input() defaultChecked?: IToggleProps['defaultChecked'];
  @Input() disabled?: IToggleProps['disabled'];
  @Input() inlineLabel?: IToggleProps['inlineLabel'];
  @Input() theme?: IToggleProps['theme'];
  @Input() styles?: IToggleProps['styles'];
  @Input() keytipProps?: IToggleProps['keytipProps'];

  @Output() readonly onChange = new EventEmitter<{ event: MouseEvent; checked?: boolean }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event: React.MouseEvent<HTMLElement>, checked?: boolean) {
    this.onChange.emit({
      event: event && event.nativeEvent,
      checked,
    });
  }
}
