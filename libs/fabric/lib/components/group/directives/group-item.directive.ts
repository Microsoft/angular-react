// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { IGroup } from 'office-ui-fabric-react/lib/GroupedList';
import { ItemChangedPayload, ChangeableItemsHelper, IChangeableItemsContainer, ChangeableItemDirective } from '@angular-react/fabric/lib/components/core';

@Directive({ selector: 'fab-group-item' })
export class GroupItemDirective extends ChangeableItemDirective<IGroup>
  implements AfterContentInit, IChangeableItemsContainer<IGroup>, IGroup, OnDestroy {
  @ContentChildren(GroupItemDirective) readonly groupItemsDirectives: QueryList<GroupItemDirective>;

  @Input() name: IGroup['name'];
  @Input() startIndex: IGroup['startIndex'];
  @Input() count: IGroup['count'];
  @Input() children?: IGroup['children'];
  @Input() level?: IGroup['level'];
  @Input() isCollapsed?: IGroup['isCollapsed'];
  @Input() isShowingAll?: IGroup['isShowingAll'];
  @Input() isDropEnabled?: IGroup['isDropEnabled'];
  @Input() data?: IGroup['data'];
  @Input() ariaLabel?: IGroup['ariaLabel'];
  @Input() hasMoreData?: IGroup['hasMoreData'];

  @Output()
  get onChildItemChanged(): EventEmitter<ItemChangedPayload<string, IGroup>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onChildItemChanged;
  }
  @Input()
  get onItemsChanged(): EventEmitter<QueryList<ChangeableItemDirective<IGroup>>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onItemsChanged;
  }

  private changeableItemsHelper: ChangeableItemsHelper<IGroup>;

  ngAfterContentInit() {
    this.changeableItemsHelper = new ChangeableItemsHelper(this.groupItemsDirectives, this, nonSelf => {
      this.children = nonSelf as any;
    });
  }

  ngOnDestroy() {
    this.changeableItemsHelper.destroy();
  }
}
