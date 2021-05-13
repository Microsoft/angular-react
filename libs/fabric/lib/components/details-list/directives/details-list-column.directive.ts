// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterContentInit, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { InputRendererOptions, KnownKeys } from '@angular-react/core';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ChangeableItemDirective } from '@angular-react/fabric/lib/components/core';

/**
 * Wrapper directive for rendering a custom column to a DetailsListColumn
 */
@Directive({ selector: 'fab-details-list-column > render' })
export class DetailsListColumnRenderDirective {
  @ContentChild(TemplateRef, { static: false }) readonly templateRef: TemplateRef<IDetailsListColumnOptionsRenderContext>;
}

/**
 * Wrapper directive for creating a DetailsListColumn
 */
@Directive({ selector: 'fab-details-list-column' })
export class DetailsListColumnDirective extends ChangeableItemDirective<IDetailsListColumnOptions>
  implements AfterContentInit {
  @ContentChild(DetailsListColumnRenderDirective, { static: false }) readonly renderDirective: DetailsListColumnRenderDirective;

  @Input() name: IColumn['name'];
  @Input() fieldName?: IColumn['fieldName'];
  @Input() className?: IColumn['className'];
  @Input() minWidth: IColumn['minWidth'];
  @Input() ariaLabel?: IColumn['ariaLabel'];
  @Input() isRowHeader?: IColumn['isRowHeader'];
  @Input() maxWidth?: IColumn['maxWidth'];
  @Input() columnActionsMode?: IColumn['columnActionsMode'];
  @Input() iconName?: IColumn['iconName'];
  @Input() isIconOnly?: IColumn['isIconOnly'];
  @Input() iconClassName?: IColumn['iconClassName'];
  @Input() isCollapsable?: IColumn['isCollapsable'];
  @Input() isSorted?: IColumn['isSorted'];
  @Input() isSortedDescending?: IColumn['isSortedDescending'];
  @Input() isResizable?: IColumn['isResizable'];
  @Input() isMultiline?: IColumn['isMultiline'];
  @Input() onRender?: IColumn['onRender'];
  @Input() getValueKey?: IColumn['getValueKey'];
  @Input() onRenderDivider?: IColumn['onRenderDivider'];
  @Input() isFiltered?: IColumn['isFiltered'];
  @Input() isGrouped?: IColumn['isGrouped'];
  @Input() data?: IColumn['data'];
  @Input() calculatedWidth?: IColumn['calculatedWidth'];
  @Input() currentWidth?: IColumn['currentWidth'];
  @Input() headerClassName?: IColumn['headerClassName'];
  @Input() isPadded?: IColumn['isPadded'];
  @Input() sortAscendingAriaLabel?: IColumn['sortAscendingAriaLabel'];
  @Input() sortDescendingAriaLabel?: IColumn['sortDescendingAriaLabel'];
  @Input() groupAriaLabel?: IColumn['groupAriaLabel'];
  @Input() filterAriaLabel?: IColumn['filterAriaLabel'];

  // Render members
  @Input() render: IDetailsListColumnOptions['render'];

  // Callback members
  @Output() readonly onColumnClick = new EventEmitter<{ ev: Event; column: IColumn }>();
  @Output() readonly onColumnContextMenu = new EventEmitter<{ column?: IColumn; ev?: Event }>();
  @Output() readonly onColumnResize = new EventEmitter<{ width?: number }>();

  ngAfterContentInit() {
    if (this.renderDirective && this.renderDirective.templateRef) {
      this.render = this.renderDirective.templateRef;
    }
  }
}

export interface IDetailsListColumnOptions<TData = any> extends Pick<IColumn, Exclude<KnownKeys<IColumn>, 'onRender'>> {
  readonly render?: InputRendererOptions<IDetailsListColumnOptionsRenderContext>;
  readonly onColumnClick?: any;
  readonly onColumnContextMenu?: any;
  readonly onColumnResize?: any;
  readonly data?: TData;
}

export interface IDetailsListColumnOptionsRenderContext {
  item?: any;
  index?: number;
  column?: IColumn;
}
