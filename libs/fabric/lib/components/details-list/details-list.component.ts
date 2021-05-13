// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChild,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  DetailsListBase,
  IColumn,
  IDetailsListCheckboxProps,
  IDetailsFooterProps,
  IDetailsHeaderProps,
  IDetailsListProps,
  IDetailsRowProps,
  IGroup,
} from 'office-ui-fabric-react/lib/DetailsList';
import { IListProps } from 'office-ui-fabric-react/lib/List';
import { Subscription } from 'rxjs';
import { omit } from '@angular-react/fabric/lib/utils';
import { mergeItemChanges, ChangeableItemsDirective } from '@angular-react/fabric/lib/components/core';
import { TypedChanges, OnChanges } from '@angular-react/fabric/lib/declarations';

import { IDetailsListColumnOptions } from './directives/details-list-column.directive';
import { DetailsListColumnsDirective } from './directives/details-list-columns.directive';
import { DetailsListGroupsDirective } from './directives/details-list-groups.directive';

@Component({
  selector: 'fab-details-list',
  exportAs: 'fabDetailsList',
  template: `
    <DetailsList
      #reactNode
      [items]="items"
      [ariaLabel]="ariaLabel"
      [ariaLabelForGrid]="ariaLabelForGrid"
      [ariaLabelForListHeader]="ariaLabelForListHeader"
      [ariaLabelForSelectAllCheckbox]="ariaLabelForSelectAllCheckbox"
      [ariaLabelForSelectionColumn]="ariaLabelForSelectionColumn"
      [cellStyleProps]="cellStyleProps"
      [checkButtonAriaLabel]="checkButtonAriaLabel"
      [checkboxCellClassName]="checkboxCellClassName"
      [checkboxVisibility]="checkboxVisibility"
      [className]="className"
      [columnReorderOptions]="columnReorderOptions"
      [columns]="transformedColumns_"
      [compact]="compact"
      [componentRef]="componentRef"
      [constrainMode]="constrainMode"
      [disableSelectionZone]="disableSelectionZone"
      [dragDropEvents]="dragDropEvents"
      [enableUpdateAnimations]="enableUpdateAnimations"
      [enterModalSelectionOnTouch]="enterModalSelectionOnTouch"
      [getCellValueKey]="getCellValueKey"
      [getGroupHeight]="getGroupHeight"
      [getKey]="getKey"
      [getRowAriaDescribedBy]="getRowAriaDescribedBy"
      [getRowAriaLabel]="getRowAriaLabel"
      [groupProps]="groupProps"
      [groups]="transformedGroups_"
      [indentWidth]="indentWidth"
      [initialFocusedIndex]="initialFocusedIndex"
      [isHeaderVisible]="isHeaderVisible"
      [layoutMode]="layoutMode"
      [listProps]="listProps"
      [minimumPixelsForDrag]="minimumPixelsForDrag"
      [rowElementEventMap]="rowElementEventMap"
      [selection]="selection"
      [selectionMode]="selectionMode"
      [selectionPreservedOnEmptyClick]="selectionPreservedOnEmptyClick"
      [selectionZoneProps]="selectionZoneProps"
      [setKey]="setKey"
      [shouldApplyApplicationRole]="shouldApplyApplicationRole"
      [skipViewportMeasures]="skipViewportMeasures"
      [styles]="styles"
      [theme]="theme"
      [useFastIcons]="useFastIcons"
      [usePageCache]="usePageCache"
      [useReducedRowRenderer]="useReducedRowRenderer"
      [viewport]="viewport"
      [RenderCheckbox]="renderCheckbox && onRenderCheckbox"
      [RenderDetailsFooter]="renderDetailsFooter && onRenderDetailsFooter"
      [RenderDetailsHeader]="renderDetailsHeader && onRenderDetailsHeader"
      [RenderMissingItem]="renderMissingItem && onRenderMissingItem"
      [RenderRow]="renderDetailsHeader && onRenderRow"
      [ActiveItemChanged]="onActiveItemChangedHandler"
      [ColumnHeaderClick]="onColumnHeaderClickHandler"
      [ColumnHeaderContextMenu]="onColumnHeaderContextMenuHandler"
      [ColumnResize]="onColumnResizeHandler"
      [DidUpdate]="onDidUpdateHandler"
      [ItemContextMenu]="onItemContextMenuHandler"
      [ItemInvoked]="onItemInvokedHandler"
      [RowDidMount]="onRowDidMountHandler"
      [RowWillUnmount]="onRowWillUnmountHandler"
      [ShouldVirtualize]="onShouldVirtualize"
    >
    </DetailsList>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDetailsListComponent extends ReactWrapperComponent<IDetailsListProps>
  implements AfterContentInit, OnChanges<FabDetailsListComponent>, OnDestroy, OnInit {
  @ContentChild(DetailsListColumnsDirective, { static: true }) readonly columnsDirective?: DetailsListColumnsDirective;
  @ContentChild(DetailsListGroupsDirective, { static: true }) readonly groupsDirective?: DetailsListGroupsDirective;

  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() theme?: IDetailsListProps['theme'];
  @Input() styles?: IDetailsListProps['styles'];
  @Input() componentRef?: IDetailsListProps['componentRef'];
  @Input() setKey?: IDetailsListProps['setKey'];
  @Input() items: IDetailsListProps['items'];
  @Input() listProps?: IDetailsListProps['listProps'];
  @Input() initialFocusedIndex?: IDetailsListProps['initialFocusedIndex'];
  @Input() className?: IDetailsListProps['className'];
  @Input() groupProps?: IDetailsListProps['groupProps'];
  @Input() indentWidth?: IDetailsListProps['indentWidth'];
  @Input() selection?: IDetailsListProps['selection'];
  @Input() selectionMode?: IDetailsListProps['selectionMode'];
  @Input() selectionPreservedOnEmptyClick?: IDetailsListProps['selectionPreservedOnEmptyClick'];
  @Input() selectionZoneProps?: IDetailsListProps['selectionZoneProps'];
  @Input() layoutMode?: IDetailsListProps['layoutMode'];
  @Input() checkboxVisibility?: IDetailsListProps['checkboxVisibility'];
  @Input() isHeaderVisible?: IDetailsListProps['isHeaderVisible'];
  @Input() constrainMode?: IDetailsListProps['constrainMode'];
  @Input() rowElementEventMap?: IDetailsListProps['rowElementEventMap'];
  @Input() getCellValueKey?: IDetailsListProps['getCellValueKey'];
  @Input() dragDropEvents?: IDetailsListProps['dragDropEvents'];
  @Input() viewport?: IDetailsListProps['viewport'];
  @Input() ariaLabelForListHeader?: IDetailsListProps['ariaLabelForListHeader'];
  @Input() ariaLabelForSelectAllCheckbox?: IDetailsListProps['ariaLabelForSelectAllCheckbox'];
  @Input() ariaLabelForSelectionColumn?: IDetailsListProps['ariaLabelForSelectionColumn'];
  @Input() getRowAriaLabel?: IDetailsListProps['getRowAriaLabel'];
  @Input() getRowAriaDescribedBy?: IDetailsListProps['getRowAriaDescribedBy'];
  @Input() getKey?: IDetailsListProps['getKey'];
  @Input() ariaLabel?: IDetailsListProps['ariaLabel'];
  @Input() checkButtonAriaLabel?: IDetailsListProps['checkButtonAriaLabel'];
  @Input() ariaLabelForGrid?: IDetailsListProps['ariaLabelForGrid'];
  @Input() shouldApplyApplicationRole?: IDetailsListProps['shouldApplyApplicationRole'];
  @Input() minimumPixelsForDrag?: IDetailsListProps['minimumPixelsForDrag'];
  @Input() compact?: IDetailsListProps['compact'];
  @Input() usePageCache?: IDetailsListProps['usePageCache'];
  @Input() onShouldVirtualize?: (props: IListProps) => boolean;
  @Input() checkboxCellClassName?: IDetailsListProps['checkboxCellClassName'];
  @Input() enterModalSelectionOnTouch?: IDetailsListProps['enterModalSelectionOnTouch'];
  @Input() columnReorderOptions?: IDetailsListProps['columnReorderOptions'];
  @Input() getGroupHeight?: IDetailsListProps['getGroupHeight'];
  @Input() useReducedRowRenderer?: IDetailsListProps['useReducedRowRenderer'];
  @Input() cellStyleProps?: IDetailsListProps['cellStyleProps'];
  @Input() disableSelectionZone?: IDetailsListProps['disableSelectionZone'];
  @Input() enableUpdateAnimations?: IDetailsListProps['enableUpdateAnimations'];
  @Input() useFastIcons?: IDetailsListProps['useFastIcons'];

  // Inherited members (IWithViewportProps)
  @Input() skipViewportMeasures?: IDetailsListProps['skipViewportMeasures'];

  // Render members
  @Input() renderCheckbox?: InputRendererOptions<IDetailsListCheckboxProps>;
  @Input() renderDetailsFooter?: InputRendererOptions<IDetailsFooterProps>;
  @Input() renderDetailsHeader?: InputRendererOptions<IDetailsHeaderProps>;
  @Input() renderMissingItem?: InputRendererOptions<IMissingItemRenderContext>;
  @Input() renderRow?: InputRendererOptions<IDetailsRowProps>;

  // Callback members
  @Output() readonly onActiveItemChanged = new EventEmitter<{ item?: any; index?: number; ev?: Event }>();
  @Output() readonly onColumnHeaderClick = new EventEmitter<{ ev?: Event; column?: IColumn }>();
  @Output() readonly onColumnHeaderContextMenu = new EventEmitter<{ column?: IColumn; ev?: Event }>();
  @Output() readonly onColumnResize = new EventEmitter<{ column?: IColumn; newWidth?: number; columnIndex?: number }>();
  @Output() readonly onDidUpdate = new EventEmitter<{ detailsList?: DetailsListBase }>();
  @Output() readonly onItemContextMenu = new EventEmitter<{ item?: any; index?: number; ev?: Event }>();
  @Output() readonly onItemInvoked = new EventEmitter<{ item?: any; index?: number; ev?: Event }>();
  @Output() readonly onRowDidMount = new EventEmitter<{ item?: any; index?: number }>();
  @Output() readonly onRowWillUnmount = new EventEmitter<{ item?: any; index?: number }>();

  // Directive members
  @Input() columns: ReadonlyArray<IDetailsListColumnOptions>;
  @Input() groups: ReadonlyArray<IGroup>;

  /** @internal */
  transformedColumns_: ReadonlyArray<IColumn>;
  transformedGroups_: ReadonlyArray<IGroup>;

  private readonly _subscriptions: Subscription[] = [];

  onRenderCheckbox: (
    props?: IDetailsListCheckboxProps,
    defaultRender?: JsxRenderFunc<IDetailsListCheckboxProps>
  ) => JSX.Element;
  onRenderDetailsFooter: (
    props?: IDetailsFooterProps,
    defaultRender?: JsxRenderFunc<IDetailsFooterProps>
  ) => JSX.Element;
  onRenderDetailsHeader: (
    props?: IDetailsHeaderProps,
    defaultRender?: JsxRenderFunc<IDetailsHeaderProps>
  ) => JSX.Element;
  onRenderMissingItem: (index?: number, rowProps?: IDetailsRowProps) => JSX.Element;
  onRenderRow: (props?: IDetailsRowProps, defaultRender?: JsxRenderFunc<IDetailsRowProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });

    // Bind this to access Angular component properties
    this.onActiveItemChangedHandler = this.onActiveItemChangedHandler.bind(this);
    this.onColumnHeaderClickHandler = this.onColumnHeaderClickHandler.bind(this);
    this.onColumnHeaderContextMenuHandler = this.onColumnHeaderContextMenuHandler.bind(this);
    this.onColumnResizeHandler = this.onColumnResizeHandler.bind(this);
    this.onDidUpdateHandler = this.onDidUpdateHandler.bind(this);
    this.onItemContextMenuHandler = this.onItemContextMenuHandler.bind(this);
    this.onItemInvokedHandler = this.onItemInvokedHandler.bind(this);
    this.onRowDidMountHandler = this.onRowDidMountHandler.bind(this);
    this.onRowWillUnmountHandler = this.onRowWillUnmountHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderCheckbox = this.createRenderPropHandler(this.renderCheckbox);
    this.onRenderDetailsFooter = this.createRenderPropHandler(this.renderDetailsFooter);
    this.onRenderDetailsHeader = this.createRenderPropHandler(this.renderDetailsHeader);
    this.onRenderRow = this.createRenderPropHandler(this.renderRow);

    const missingItemRenderer = this.createInputJsxRenderer(this.renderMissingItem);
    this.onRenderMissingItem = (index, rowProps) => missingItemRenderer({ index, rowProps });
  }

  ngOnChanges(changes: TypedChanges<FabDetailsListComponent>) {
    if (
      changes['columns'] &&
      changes['columns'].currentValue &&
      changes['columns'].previousValue !== changes['columns'].currentValue
    ) {
      this._createTransformedColumns(changes['columns'].currentValue);
    }
    if (
      changes['groups'] &&
      changes['groups'].currentValue &&
      changes['groups'].previousValue !== changes['groups'].currentValue
    ) {
      this._createTransformedGroups(changes['groups'].currentValue);
    }
    super.ngOnChanges(changes);
  }

  ngAfterContentInit() {
    if (this.columnsDirective) {
      this._initDirective(this.columnsDirective, 'columns');
    }
    if (this.groupsDirective) {
      this._initDirective(this.groupsDirective, 'groups');
    }
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onActiveItemChangedHandler(item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) {
    this.onActiveItemChanged.emit({ item, index, ev: ev.nativeEvent });
  }

  onColumnHeaderClickHandler(ev?: React.MouseEvent<HTMLElement>, column?: IColumn) {
    this.onColumnHeaderClick.emit({ ev: ev.nativeEvent, column });
  }

  onColumnHeaderContextMenuHandler(column?: IColumn, ev?: React.MouseEvent<HTMLElement>) {
    this.onColumnHeaderContextMenu.emit({ column, ev: ev.nativeEvent });
  }

  onColumnResizeHandler(column?: IColumn, newWidth?: number, columnIndex?: number) {
    this.onColumnResize.emit({ column, newWidth, columnIndex });
  }

  onDidUpdateHandler(detailsList?: DetailsListBase) {
    this.onDidUpdate.emit({ detailsList });
  }

  onItemContextMenuHandler(item?: any, index?: number, ev?: Event) {
    this.onItemContextMenu.emit({ item, index, ev });
  }

  onItemInvokedHandler(item?: any, index?: number, ev?: Event) {
    this.onItemInvoked.emit({ item, index, ev });
  }

  onRowDidMountHandler(item?: any, index?: number) {
    this.onRowDidMount.emit({ item, index });
  }

  onRowWillUnmountHandler(item?: any, index?: number) {
    this.onRowWillUnmount.emit({ item, index });
  }

  private _initDirective(directive: ChangeableItemsDirective<any>, propertyKey: 'columns' | 'groups') {
    const transformItemsFunc = this._transformItemsFunction(directive);
    const setItems = (mapper: (items: ReadonlyArray<any>) => ReadonlyArray<any>) => {
      this[propertyKey] = mapper(this[propertyKey]);
      transformItemsFunc(this[propertyKey]);
      this.markForCheck();
    };

    setItems(() => directive.items);

    // Subscribe to adding/removing items
    this._subscriptions.push(
      directive.onItemsChanged.subscribe((newItems: QueryList<ChangeableItemsDirective<any>>) => {
        setItems(() => newItems.map(directive => directive));
      })
    );

    // Subscribe for existing item changes
    this._subscriptions.push(
      directive.onChildItemChanged.subscribe(({ key, changes }) => {
        setItems(items => items.map(item => (item.key === key ? mergeItemChanges(item, changes) : item)));
        this.markForCheck();
      })
    );
  }

  private _transformItemsFunction(directive: ChangeableItemsDirective<any>) {
    if (directive instanceof DetailsListColumnsDirective) {
      return (newColumns: ReadonlyArray<any>) => this._createTransformedColumns(newColumns);
    } else if (directive instanceof DetailsListGroupsDirective) {
      return (newGroups: ReadonlyArray<any>) => this._createTransformedGroups(newGroups);
    } else {
      throw new Error('Invalid directive given');
    }
  }

  private _createTransformedColumns(newColumns: ReadonlyArray<IDetailsListColumnOptions>) {
    this.transformedColumns_ = newColumns.map(column => this._transformDetailsListColumnOptionsToProps(column));
  }

  private _transformDetailsListColumnOptionsToProps(options: IDetailsListColumnOptions): IColumn {
    const renderer = this.createInputJsxRenderer(options.render);
    return Object.assign(
      {},
      omit(options, 'render'),
      renderer &&
      ({
        onRender: (item?: any, index?: number, column?: IColumn) => renderer({ item, index, column }),
      } as Pick<IColumn, 'onRender'>)
    ) as IColumn;
  }

  private _createTransformedGroups(newGroups: ReadonlyArray<IGroup>) {
    this.transformedGroups_ = newGroups;
  }
}

export interface IMissingItemRenderContext {
  index?: number;
  rowProps?: IDetailsRowProps;
}
