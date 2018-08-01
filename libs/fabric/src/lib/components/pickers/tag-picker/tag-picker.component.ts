import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ITagPickerProps, ITag } from 'office-ui-fabric-react/lib/Pickers/TagPicker/TagPicker';
import { FabBasePickerComponent } from '../base-picker/base-picker.component';

@Component({
  selector: 'fab-tag-picker',
  exportAs: 'fabTagPicker',
  template: `
    <TagPicker
      #reactNode

      [componentRef]="componentRef"
      [resolveDelay]="resolveDelay"
      [defaultSelectedItems]="defaultSelectedItems"
      [getTextFromItem]="getTextFromItem"
      [className]="className"
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

      [RenderItem]="renderItem &&onRenderItem"
      [RenderSuggestionsItem]="renderSuggestionsItem && onRenderSuggestionsItem"

      [Change]="onChangeHandler"
      [Focus]="onFocusHandler"
      [Blur]="onBlurHandler"
      [Dismiss]="onDismissHandler"
      [RemoveSuggestion]="onRemoveSuggestionHandler">
    </TagPicker>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTagPickerComponent extends FabBasePickerComponent<ITag, ITagPickerProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }
}
