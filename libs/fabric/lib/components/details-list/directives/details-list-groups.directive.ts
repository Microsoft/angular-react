// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';
import { IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { ChangeableItemsDirective } from '@angular-react/fabric/lib/components/core';

import { GroupItemDirective } from '@angular-react/fabric/lib/components/group';

/**
 * Wrapper directive for creating multiple DetailsList Groups
 */
@Directive({ selector: 'fab-details-list > groups' })
export class DetailsListGroupsDirective extends ChangeableItemsDirective<IGroup> {
  @ContentChildren(GroupItemDirective) readonly directiveItems: QueryList<GroupItemDirective>;

  get items() {
    return this.directiveItems.toArray();
  }
}
