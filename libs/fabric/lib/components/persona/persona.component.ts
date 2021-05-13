// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ImageLoadState } from 'office-ui-fabric-react/lib/components/Image/Image.types';
import { IPersonaCoinProps, IPersonaProps, IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';

export abstract class FabPersonaBaseComponent<TProps extends IPersonaSharedProps> extends ReactWrapperComponent<TProps>
  implements OnInit {
  @Input() text?: IPersonaProps['text'];
  @Input() size?: IPersonaProps['size'];
  @Input() imageShouldFadeIn?: IPersonaProps['imageShouldFadeIn'];
  @Input() imageShouldStartVisible?: IPersonaProps['imageShouldStartVisible'];
  @Input() imageUrl?: IPersonaProps['imageUrl'];
  @Input() imageAlt?: IPersonaProps['imageAlt'];
  @Input() imageInitials?: IPersonaProps['imageInitials'];
  @Input() allowPhoneInitials?: IPersonaProps['allowPhoneInitials'];
  @Input() initialsColor?: IPersonaProps['initialsColor'];
  @Input() presence?: IPersonaProps['presence'];
  @Input() isOutOfOffice?: IPersonaProps['isOutOfOffice'];
  @Input() secondaryText?: IPersonaProps['secondaryText'];
  @Input() tertiaryText?: IPersonaProps['tertiaryText'];
  @Input() optionalText?: IPersonaProps['optionalText'];
  @Input() hidePersonaDetails?: IPersonaProps['hidePersonaDetails'];
  @Input() showSecondaryText?: IPersonaProps['showSecondaryText'];
  @Input() showUnknownPersonaCoin?: IPersonaProps['showUnknownPersonaCoin'];
  @Input() showInitialsUntilImageLoads?: IPersonaProps['showInitialsUntilImageLoads'];
  @Input() coinSize?: IPersonaProps['coinSize'];
  @Input() theme?: IPersonaProps['theme'];

  @Input() renderCoin?: InputRendererOptions<IPersonaSharedProps>;
  @Input() renderInitials?: InputRendererOptions<IPersonaSharedProps>;

  @Output() readonly onPhotoLoadingStateChange = new EventEmitter<ImageLoadState>();

  onRenderCoin: (props?: IPersonaSharedProps, defaultRender?: JsxRenderFunc<IPersonaSharedProps>) => JSX.Element;
  onRenderInitials: (props?: IPersonaSharedProps, defaultRender?: JsxRenderFunc<IPersonaSharedProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });
  }

  ngOnInit() {
    this.onRenderCoin = this.createRenderPropHandler(this.renderCoin);
    this.onRenderInitials = this.createRenderPropHandler(this.renderInitials);
  }
}

@Component({
  selector: 'fab-persona',
  exportAs: 'fabPersona',
  template: `
    <Persona
      #reactNode
      [text]="text"
      [size]="size"
      [imageShouldFadeIn]="imageShouldFadeIn"
      [imageShouldStartVisible]="imageShouldStartVisible"
      [imageUrl]="imageUrl"
      [imageAlt]="imageAlt"
      [imageInitials]="imageInitials"
      [allowPhoneInitials]="allowPhoneInitials"
      [initialsColor]="initialsColor"
      [presence]="presence"
      [isOutOfOffice]="isOutOfOffice"
      [secondaryText]="secondaryText"
      [tertiaryText]="tertiaryText"
      [optionalText]="optionalText"
      [hidePersonaDetails]="hidePersonaDetails"
      [showSecondaryText]="showSecondaryText"
      [showUnknownPersonaCoin]="showUnknownPersonaCoin"
      [showInitialsUntilImageLoads]="showInitialsUntilImageLoads"
      [coinSize]="coinSize"
      [theme]="theme"
      [componentRef]="componentRef"
      [className]="className"
      [styles]="styles"
      [coinProps]="coinProps"
      [RenderInitials]="renderInitials && onRenderInitials"
      [RenderCoin]="renderCoin && onRenderCoin"
      [RenderPrimaryText]="renderPrimaryText && onRenderPrimaryText"
      [RenderSecondaryText]="renderSecondaryText && onRenderSecondaryText"
      [RenderTertiaryText]="renderTertiaryText && onRenderTertiaryText"
      [RenderOptionalText]="renderOptionalText && onRenderOptionalText"
      (onPhotoLoadingStateChange)="onPhotoLoadingStateChange.emit($event)"
    >
    </Persona>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPersonaComponent extends FabPersonaBaseComponent<IPersonaProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IPersonaProps['componentRef'];
  @Input() className?: IPersonaProps['className'];
  @Input() styles?: IPersonaProps['styles'];
  @Input() coinProps?: IPersonaProps['coinProps'];

  @Input() renderPrimaryText?: InputRendererOptions<IPersonaProps>;
  @Input() renderSecondaryText?: InputRendererOptions<IPersonaProps>;
  @Input() renderTertiaryText?: InputRendererOptions<IPersonaProps>;
  @Input() renderOptionalText?: InputRendererOptions<IPersonaProps>;

  onRenderPrimaryText: (props?: IPersonaProps, defaultRender?: JsxRenderFunc<IPersonaProps>) => JSX.Element;
  onRenderSecondaryText: (props?: IPersonaProps, defaultRender?: JsxRenderFunc<IPersonaProps>) => JSX.Element;
  onRenderTertiaryText: (props?: IPersonaProps, defaultRender?: JsxRenderFunc<IPersonaProps>) => JSX.Element;
  onRenderOptionalText: (props?: IPersonaProps, defaultRender?: JsxRenderFunc<IPersonaProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, ngZone);
  }

  ngOnInit() {
    super.ngOnInit();

    this.onRenderPrimaryText = this.createRenderPropHandler(this.renderPrimaryText);
    this.onRenderSecondaryText = this.createRenderPropHandler(this.renderSecondaryText);
    this.onRenderTertiaryText = this.createRenderPropHandler(this.renderTertiaryText);
    this.onRenderOptionalText = this.createRenderPropHandler(this.renderOptionalText);
  }
}

@Component({
  selector: 'fab-persona-coin',
  exportAs: 'fabPersonaCoin',
  template: `
    <PersonaCoin
      #reactNode
      [text]="text"
      [size]="size"
      [imageShouldFadeIn]="imageShouldFadeIn"
      [imageShouldStartVisible]="imageShouldStartVisible"
      [imageUrl]="imageUrl"
      [imageAlt]="imageAlt"
      [imageInitials]="imageInitials"
      [allowPhoneInitials]="allowPhoneInitials"
      [initialsColor]="initialsColor"
      [presence]="presence"
      [isOutOfOffice]="isOutOfOffice"
      [secondaryText]="secondaryText"
      [tertiaryText]="tertiaryText"
      [optionalText]="optionalText"
      [hidePersonaDetails]="hidePersonaDetails"
      [showUnknownPersonaCoin]="showUnknownPersonaCoin"
      [showInitialsUntilImageLoads]="showInitialsUntilImageLoads"
      [coinSize]="coinSize"
      [theme]="theme"
      [componentRef]="componentRef"
      [styles]="styles"
      [className]="className"
      [RenderInitials]="renderInitials && onRenderInitials"
      [RenderCoin]="renderCoin && onRenderCoin"
      (onPhotoLoadingStateChange)="onPhotoLoadingStateChange.emit($event)"
    >
    </PersonaCoin>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPersonaCoinComponent extends FabPersonaBaseComponent<IPersonaCoinProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IPersonaCoinProps['componentRef'];
  @Input() styles?: IPersonaCoinProps['styles'];
  @Input() className?: IPersonaCoinProps['className'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, ngZone);
  }
}
