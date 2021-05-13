// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Directive, Input } from '@angular/core';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * Wrapper directive for creating a DropdownOption
 * @paramName optionKey Binds to React 'key' property.
 *                      Name change necessary because key is a reserved attribute in the wrapper component.
 */
@Directive({ selector: 'fab-dropdown-option' })
export class DropdownOptionDirective {
  @Input() optionKey: IDropdownOption['key'];
  @Input() text: IDropdownOption['text'];
  @Input() title?: IDropdownOption['title'];
  @Input() itemType?: IDropdownOption['itemType'];
  @Input() index?: IDropdownOption['index'];
  @Input() ariaLabel?: IDropdownOption['ariaLabel'];
  @Input() selected?: IDropdownOption['selected'];
  @Input() disabled?: IDropdownOption['disabled'];
  @Input() hidden?: IDropdownOption['hidden'];
  @Input() data?: IDropdownOption['data'];
}
