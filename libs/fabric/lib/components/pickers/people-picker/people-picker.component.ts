// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    Renderer2,
    ViewChild,
    Output,
    EventEmitter,
  } from '@angular/core';
  import { FabBasePickerComponent } from '../base-picker/base-picker.component';
  import { IPeoplePickerProps, BaseAutoFill } from 'office-ui-fabric-react/lib/Pickers';
  import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

  @Component({
    selector: 'fab-people-picker',
    exportAs: 'fabPeoplePicker',
    template: `
      <PeoplePicker
        #reactNode
        [componentRef]="componentRef"
        [resolveDelay]="resolveDelay"
        [defaultSelectedItems]="defaultSelectedItems"
        [getTextFromItem]="getTextFromItem"
        [className]="className"
        [pickerCalloutProps]="pickerCalloutProps"
        [searchingText]="searchingText"
        [disabled]="disabled"
        [itemLimit]="itemLimit"
        [createGenericItem]="createGenericItem"
        [removeButtonAriaLabel]="removeButtonAriaLabel"
        [selectedItems]="selectedItems"
        [enableSelectedSuggestionAlert]="enableSelectedSuggestionAlert"
        [inputProps]="inputProps"
        [pickerSuggestionsProps]="pickerSuggestionsProps"
        [ItemSelected]="onItemSelected"
        [InputChange]="onInputChange"
        [EmptyInputFocus]="onEmptyInputFocus"
        [ResolveSuggestions]="onResolveSuggestions"
        [GetMoreResults]="onGetMoreResults"
        [ValidateInput]="onValidateInput"
        [RenderItem]="renderItem && onRenderItem"
        [RenderSuggestionsItem]="renderSuggestionsItem && onRenderSuggestionsItem"
        [Change]="onChangeHandler"
        [Focus]="onFocusHandler"
        [Blur]="onBlurHandler"
        [Dismiss]="onDismissHandler"
        [RemoveSuggestion]="onRemoveSuggestionHandler"
      >
      </PeoplePicker>
    `,
    styles: ['react-renderer'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class FabPeoplePickerComponent extends FabBasePickerComponent<IPersonaProps, IPeoplePickerProps> {
    @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
      super(elementRef, changeDetectorRef, renderer, ngZone);
    }
  }
