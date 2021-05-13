// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';

import { ComboBoxOptionDirective } from "./combo-box-option.directive";

/**
 * Wrapper directive for creating multiple ComboBoxOptions
 * Note that if you use this, it will override the imperative [options] binding.
 */
@Directive({ selector: 'fab-combo-box > options' })
export class ComboBoxOptionsDirective {
  @ContentChildren(ComboBoxOptionDirective) readonly directiveItems: QueryList<ComboBoxOptionDirective>;

  get items() {
    return this.directiveItems.map<IComboBoxOption>(({ optionKey, ...otherDirectiveProps }) => ({
      key: optionKey,
      ...otherDirectiveProps
    }));
  }
}
