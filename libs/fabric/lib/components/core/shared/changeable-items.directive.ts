// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterContentInit, ContentChildren, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';

import { ItemChangedPayload } from '../declarative/item-changed.payload';
import { ChangeableItemsHelper, IChangeableItemsContainer } from './changeable-helper';
import { ChangeableItemDirective } from './changeable-item.directive';

/**
 * Parent class for wrapper directive for multiple ChangeableItemDirectives
 */
export abstract class ChangeableItemsDirective<TItem>
  implements AfterContentInit, IChangeableItemsContainer<TItem>, OnDestroy {
  @ContentChildren(ChangeableItemDirective) readonly directiveItems: QueryList<ChangeableItemDirective<TItem>>;

  @Output()
  get onChildItemChanged(): EventEmitter<ItemChangedPayload<string, TItem>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onChildItemChanged;
  }
  @Output()
  get onItemsChanged(): EventEmitter<QueryList<ChangeableItemDirective<TItem>>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onItemsChanged;
  }

  private changeableItemsHelper: ChangeableItemsHelper<TItem>;

  abstract get items(): TItem[];

  ngAfterContentInit() {
    this.changeableItemsHelper = new ChangeableItemsHelper(this.directiveItems);
  }

  ngOnDestroy() {
    this.changeableItemsHelper.destroy();
  }
}
