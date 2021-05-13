// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent, JsxRenderFunc, InputRendererOptions } from '@angular-react/core';
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
  OnInit,
} from '@angular/core';
import { ITeachingBubbleProps } from 'office-ui-fabric-react/lib/TeachingBubble';

@Component({
  selector: 'fab-teaching-bubble',
  exportAs: 'fabTeachingBubble',
  template: `
    <TeachingBubble
      #reactNode
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaLabelledBy]="ariaLabelledBy"
      [calloutProps]="calloutProps"
      [componentRef]="componentRef"
      [footerContent]="footerContent"
      [hasCloseButton]="hasCloseButton"
      [hasCondensedHeadline]="hasCondensedHeadline"
      [hasSmallHeadline]="hasSmallHeadline"
      [headline]="headline"
      [illustrationImage]="illustrationImage"
      [isWide]="isWide"
      (onDismiss)="onDismiss.emit($event)"
      [primaryButtonProps]="primaryButtonProps"
      [secondaryButtonProps]="secondaryButtonProps"
      [styles]="styles"
      [target]="target"
      [theme]="theme"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </TeachingBubble>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTeachingBubbleComponent extends ReactWrapperComponent<ITeachingBubbleProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() ariaDescribedBy?: ITeachingBubbleProps['ariaDescribedBy'];
  @Input() ariaLabelledBy?: ITeachingBubbleProps['ariaLabelledBy'];
  @Input() calloutProps?: ITeachingBubbleProps['calloutProps'];
  @Input() componentRef?: ITeachingBubbleProps['componentRef'];
  @Input() footerContent?: ITeachingBubbleProps['footerContent'];
  @Input() hasCloseButton?: ITeachingBubbleProps['hasCloseButton'];
  @Input() hasCondensedHeadline?: ITeachingBubbleProps['hasCondensedHeadline'];
  @Input() hasSmallHeadline?: ITeachingBubbleProps['hasSmallHeadline'];
  @Input() headline?: ITeachingBubbleProps['headline'];
  @Input() illustrationImage?: ITeachingBubbleProps['illustrationImage'];
  @Input() isWide?: ITeachingBubbleProps['isWide'];
  @Input() primaryButtonProps?: ITeachingBubbleProps['primaryButtonProps'];
  @Input() secondaryButtonProps?: ITeachingBubbleProps['secondaryButtonProps'];
  @Input() styles?: ITeachingBubbleProps['styles'];
  @Input() target?: ITeachingBubbleProps['target'];
  @Input() theme?: ITeachingBubbleProps['theme'];

  @Output() readonly onDismiss = new EventEmitter<{ ev?: any }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}