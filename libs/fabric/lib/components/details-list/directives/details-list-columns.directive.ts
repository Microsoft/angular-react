// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ChangeableItemsDirective } from '@angular-react/fabric/lib/components/core';

import { DetailsListColumnDirective, IDetailsListColumnOptions } from './details-list-column.directive';

/**
 * Wrapper directive for creating multiple DetailsListColumns
 */
@Directive({ selector: 'fab-details-list > columns' })
export class DetailsListColumnsDirective extends ChangeableItemsDirective<IDetailsListColumnOptions> {
  @ContentChildren(DetailsListColumnDirective) readonly directiveItems: QueryList<DetailsListColumnDirective>;

  get items() {
    return this.directiveItems.map<IDetailsListColumnOptions>(directiveItem => ({
      ...directiveItem,
      onColumnClick: (ev: React.MouseEvent, column: IColumn) => {
        directiveItem.onColumnClick.emit({ ev: ev && ev.nativeEvent, column });
      },
      onColumnContextMenu: (column?: IColumn, ev?: React.MouseEvent) => {
        directiveItem.onColumnContextMenu.emit({ column, ev: ev && ev.nativeEvent });
      },
      onColumnResize: (width?: number) => {
        directiveItem.onColumnResize.emit({ width });
      },
    }));
  }
}
