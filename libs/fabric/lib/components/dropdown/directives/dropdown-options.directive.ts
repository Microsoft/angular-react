// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';

import { DropdownOptionDirective } from './dropdown-option.directive';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * Wrapper directive for creating multiple DropdownOptions
 * Note that if you use this, it will override the imperative [options] binding.
 */
@Directive({ selector: 'fab-dropdown > options' })
export class DropdownOptionsDirective {
  @ContentChildren(DropdownOptionDirective) readonly directiveItems: QueryList<DropdownOptionDirective>;

  get items() {
    return this.directiveItems.map<IDropdownOption>(({ optionKey, ...otherDirectiveProps }) => ({
      key: optionKey,
      ...otherDirectiveProps
    }));
  }
}
