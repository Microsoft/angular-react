// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventEmitter, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemChangedPayload, ItemChanges } from '../declarative/item-changed.payload';
import { ChangeableItemDirective } from './changeable-item.directive';

/**
 * Helper class for single changeable item
 */
export class ChangeableItemHelper<TItem> {
  readonly onItemChanged = new EventEmitter<ItemChangedPayload<string, TItem>>();

  constructor(private readonly key: string) {}

  /**
   * Action to be called by user of class when change is detected
   * (Typically called in ngOnChanges)
   * @param changes TypedChanges that are to be emitted
   */
  emitChanges(changes: ItemChanges<TItem>) {
    this.onItemChanged.emit({ key: this.key, changes });
  }
}

/**
 * Parent class for wrapper directive for multiple ChangeableItemDirectives
 */
export class ChangeableItemsHelper<TItem> {
  readonly onChildItemChanged = new EventEmitter<ItemChangedPayload<string, TItem>>();
  readonly onItemsChanged = new EventEmitter<QueryList<ChangeableItemDirective<TItem>>>();

  private readonly _subscriptionsMap: { [key: string]: Subscription } = {};
  private _changeSubscription: Subscription;

  /**
   * Initialize subscriptions to watch for changes to children ChangeableItemDirectives
   * (Typically called in ngAfterContentInit after @ContentChildren are initialized)
   * @param directiveItems List of children to watch for
   * @param self Reference to component using this helper. This component gets filtered out in case
   *  it appears in the list of children (i.e. when a component has children of its own type)
   * @param nonSelfHandler Callback to handle filtered list of children when updated
   */
  constructor(
    private directiveItems: QueryList<ChangeableItemDirective<TItem>>,
    private self?: IChangeableItemsContainer<TItem>,
    private nonSelfHandler?: (nonSelfDirectives: ChangeableItemDirective<TItem>[]) => void
  ) {
    this._subscribeNewDirectives();
    this._changeSubscription = this.directiveItems.changes.subscribe(newValues => {
      this.onItemsChanged.emit(newValues);
      this._subscribeNewDirectives();
    });
  }

  /**
   * Action to be called by user of class when directive/component is destroyed
   * (Typically called in ngOnDestroy)
   */
  destroy() {
    Object.values(this._subscriptionsMap).forEach(value => value.unsubscribe());
    this._changeSubscription.unsubscribe();
  }

  private _subscribeNewDirectives() {
    const nonSelfDirectives = this._handleNonSelfDirectives();
    nonSelfDirectives.forEach(directiveItem => {
      if (this._subscriptionsMap[directiveItem.key]) {
        this._subscriptionsMap[directiveItem.key].unsubscribe();
      }
      this._subscriptionsMap[directiveItem.key] = directiveItem.onItemChanged.subscribe(changes => {
        this._handleNonSelfDirectives();
        this.onChildItemChanged.emit(changes);
        if (this.self && this.self.onItemChanged) {
          this.self.onItemChanged.emit(changes);
        }
      });
    });
  }

  private _handleNonSelfDirectives() {
    const nonSelfDirectives = this.directiveItems.filter(directiveItem => directiveItem !== (this.self as any));
    if (this.nonSelfHandler && nonSelfDirectives.length) {
      this.nonSelfHandler(nonSelfDirectives);
    }
    return nonSelfDirectives;
  }
}

/**
 * Interface for directives that contain changeable items
 */
export interface IChangeableItemsContainer<TItem> {
  onChildItemChanged: EventEmitter<ItemChangedPayload<string, TItem>>;
  onItemChanged?: EventEmitter<ItemChangedPayload<string, TItem>>;
  onItemsChanged: EventEmitter<QueryList<ChangeableItemDirective<TItem>>>;
}
