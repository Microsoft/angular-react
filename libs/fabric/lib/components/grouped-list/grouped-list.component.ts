// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IGroup, IGroupedListProps, IGroupRenderProps } from 'office-ui-fabric-react/lib/GroupedList';
import { IListProps } from 'office-ui-fabric-react/lib/List';

@Component({
  selector: 'fab-grouped-list',
  exportAs: 'fabGroupedList',
  template: `
    <GroupedList
      #reactNode
      [componentRef]="componentRef"
      [theme]="theme"
      [styles]="styles"
      [className]="className"
      [compact]="compact"
      [dragDropEvents]="dragDropEvents"
      [dragDropHelper]="dragDropHelper"
      [eventsToRegister]="eventsToRegister"
      [groupProps]="groupProps"
      [groups]="groups"
      [items]="items"
      [listProps]="listProps"
      [selection]="selection"
      [selectionMode]="selectionMode"
      [viewport]="viewport"
      [usePageCache]="usePageCache"
      [shouldVirtualize]="shouldVirtualize"
      [getGroupHeight]="getGroupHeight"
      [RenderCell]="renderCell && onRenderCell"
      [GroupExpandStateChanged]="onGroupExpandStateChangedHandler"
    >
    </GroupedList>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabGroupedListComponent extends ReactWrapperComponent<IGroupedListProps> implements OnInit {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IGroupedListProps['componentRef'];
  @Input() theme?: IGroupedListProps['theme'];
  @Input() styles?: IGroupedListProps['styles'];
  @Input() className?: IGroupedListProps['className'];
  @Input() compact?: IGroupedListProps['compact'];
  @Input() dragDropEvents?: IGroupedListProps['dragDropEvents'];
  @Input() dragDropHelper?: IGroupedListProps['dragDropHelper'];
  @Input() eventsToRegister?: IGroupedListProps['eventsToRegister'];
  @Input() groupProps?: IGroupRenderProps;
  @Input() groups?: IGroupedListProps['groups'];
  @Input() items: IGroupedListProps['items'];
  @Input() listProps?: IGroupedListProps['listProps'];
  @Input() selection?: IGroupedListProps['selection'];
  @Input() selectionMode?: IGroupedListProps['selectionMode'];
  @Input() viewport?: IGroupedListProps['viewport'];
  @Input() usePageCache?: IGroupedListProps['usePageCache'];
  @Input() shouldVirtualize?: (props: IListProps) => boolean;
  @Input() getGroupHeight?: (group: IGroup, groupIndex: number) => number;

  @Input() renderCell: InputRendererOptions<ICellRenderContext>;

  @Output() readonly onGroupExpandStateChanged = new EventEmitter<{ isSomeGroupExpanded: boolean }>();

  private _renderCell: JsxRenderFunc<ICellRenderContext>;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderCell = this.onRenderCell.bind(this);
    this.onGroupExpandStateChangedHandler = this.onGroupExpandStateChangedHandler.bind(this);
  }

  ngOnInit() {
    this._renderCell = this.createInputJsxRenderer(this.renderCell);
  }

  onRenderCell(nestingDepth?: number, item?: any, index?: number): React.ReactNode {
    return this._renderCell({ nestingDepth, item, index });
  }

  onGroupExpandStateChangedHandler(isSomeGroupExpanded: boolean) {
    this.onGroupExpandStateChanged.emit({
      isSomeGroupExpanded,
    });
  }
}

export interface ICellRenderContext {
  nestingDepth?: number;
  item?: any;
  index?: number;
}
