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
import { IDialogContentProps, IDialogFooterProps, IDialogProps } from 'office-ui-fabric-react/lib/Dialog';

@Component({
  selector: 'fab-dialog',
  exportAs: 'fabDialog',
  template: `
    <!-- prettier-ignore -->
    <Dialog
      #reactNode
      [responsiveMode]="responsiveMode"
      [elementToFocusOnDismiss]="elementToFocusOnDismiss"
      [ignoreExternalFocusing]="ignoreExternalFocusing"
      [forceFocusInsideTrap]="forceFocusInsideTrap"
      [firstFocusableSelector]="firstFocusableSelector"
      [closeButtonAriaLabel]="closeButtonAriaLabel"
      [isClickableOutsideFocusTrap]="isClickableOutsideFocusTrap"
      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [dialogContentProps]="dialogContentProps"
      [hidden]="hidden"
      [modalProps]="modalProps"
      [minWidth]="minWidth"
      [maxWidth]="maxWidth"
      (onDismiss)="onDismissHandler($event)"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Dialog>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDialogComponent extends ReactWrapperComponent<IDialogProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() responsiveMode?: IDialogProps['responsiveMode'];
  @Input() elementToFocusOnDismiss?: IDialogProps['elementToFocusOnDismiss'];
  @Input() ignoreExternalFocusing?: IDialogProps['ignoreExternalFocusing'];
  @Input() forceFocusInsideTrap?: IDialogProps['forceFocusInsideTrap'];
  @Input() firstFocusableSelector?: IDialogProps['firstFocusableSelector'];
  @Input() closeButtonAriaLabel?: IDialogProps['closeButtonAriaLabel'];
  @Input() isClickableOutsideFocusTrap?: IDialogProps['isClickableOutsideFocusTrap'];
  @Input() componentRef?: IDialogProps['componentRef'];
  @Input() styles?: IDialogProps['styles'];
  @Input() theme?: IDialogProps['theme'];
  @Input() dialogContentProps?: IDialogProps['dialogContentProps'];
  @Input() hidden?: IDialogProps['hidden'];
  @Input() modalProps?: IDialogProps['modalProps'];
  @Input() minWidth?: IDialogProps['minWidth'];
  @Input() maxWidth?: IDialogProps['maxWidth'];

  @Output() readonly onDismiss = new EventEmitter<MouseEvent>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    this.onDismissHandler = this.onDismissHandler.bind(this);
  }

  onDismissHandler(ev: React.MouseEvent<HTMLButtonElement>) {
    this.onDismiss.emit(ev && ev.nativeEvent);
  }
}

@Component({
  selector: 'fab-dialog-footer',
  exportAs: 'fabDialogFooter',
  template: `
    <DialogFooter #reactNode [componentRef]="componentRef" [styles]="styles" [theme]="theme" [className]="className">
      <ReactContent><ng-content></ng-content></ReactContent>
    </DialogFooter>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDialogFooterComponent extends ReactWrapperComponent<IDialogFooterProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IDialogFooterProps['componentRef'];
  @Input() styles?: IDialogFooterProps['styles'];
  @Input() theme?: IDialogFooterProps['theme'];
  @Input() className?: IDialogFooterProps['className'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}

@Component({
  selector: 'fab-dialog-content',
  exportAs: 'fabDialogContent',
  template: `
    <DialogContent
      #reactNode
      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [isMultiline]="isMultiline"
      [showCloseButton]="showCloseButton"
      [topButtonsProps]="topButtonsProps"
      [className]="className"
      [subTextId]="subTextId"
      [subText]="subText"
      [titleId]="titleId"
      [title]="title"
      [responsiveMode]="responsiveMode"
      [closeButtonAriaLabel]="closeButtonAriaLabel"
      [type]="type"
      [draggableHeaderClassName]="draggableHeaderClassName"
      (onDismiss)="onDismiss.emit($event && $event.nativeEvent)"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </DialogContent>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDialogContentComponent extends ReactWrapperComponent<IDialogContentProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IDialogContentProps['componentRef'];
  @Input() styles?: IDialogContentProps['styles'];
  @Input() theme?: IDialogContentProps['theme'];
  @Input() isMultiline?: IDialogContentProps['isMultiline'];
  @Input() showCloseButton?: IDialogContentProps['showCloseButton'];
  @Input() topButtonsProps?: IDialogContentProps['topButtonsProps'];
  @Input() className?: IDialogContentProps['className'];
  @Input() subTextId?: IDialogContentProps['subTextId'];
  @Input() subText?: IDialogContentProps['subText'];
  @Input() titleId?: IDialogContentProps['titleId'];
  @Input() title?: IDialogContentProps['title'];
  @Input() responsiveMode?: IDialogContentProps['responsiveMode'];
  @Input() closeButtonAriaLabel?: IDialogContentProps['closeButtonAriaLabel'];
  @Input() type?: IDialogContentProps['type'];
  @Input() draggableHeaderClassName?: IDialogContentProps['draggableHeaderClassName'];

  @Output() readonly onDismiss = new EventEmitter<MouseEvent>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
