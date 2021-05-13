// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, KnownKeys, ReactWrapperComponent } from '@angular-react/core';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Subscription } from 'rxjs';
import { mergeItemChanges } from '@angular-react/fabric/lib/components/core';
import { omit } from '@angular-react/fabric/lib/utils';
import { OnChanges, TypedChanges } from '@angular-react/fabric/lib/declarations';

import { CommandBarItemChangedPayload, CommandBarItemDirective } from './directives/command-bar-item.directives';
import {
  CommandBarFarItemsDirective,
  CommandBarItemsDirective,
  CommandBarItemsDirectiveBase,
  CommandBarOverflowItemsDirective,
} from './directives/command-bar-items.directives';

@Component({
  selector: 'fab-command-bar',
  exportAs: 'fabCommandBar',
  template: `
    <CommandBar
      #reactNode
      [componentRef]="componentRef"
      [items]="transformedItems_"
      [farItems]="transformedFarItems_"
      [overflowItems]="transformedOverflowItems_"
      [overflowButtonProps]="overflowButtonProps"
      [overflowButtonAs]="overflowButtonAs"
      [buttonAs]="buttonAs"
      [shiftOnReduce]="shiftOnReduce"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [styles]="styles"
      [theme]="theme"
      [ReduceData]="onReduceData"
      [GrowData]="onGrowData"
      (onDataReduced)="(onDataReduced)"
      (onDataGrown)="(onDataGrown)"
    >
    </CommandBar>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps>
  implements OnChanges<FabCommandBarComponent>, AfterContentInit, OnDestroy {
  @ContentChild(CommandBarItemsDirective, { static: true }) readonly itemsDirective?: CommandBarItemsDirective;
  @ContentChild(CommandBarFarItemsDirective, { static: true }) readonly farItemsDirective?: CommandBarFarItemsDirective;
  @ContentChild(CommandBarOverflowItemsDirective, { static: true }) readonly overflowItemsDirective?: CommandBarOverflowItemsDirective;

  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ICommandBarProps['componentRef'];
  @Input() overflowButtonProps?: ICommandBarProps['overflowButtonProps'];
  @Input() overflowButtonAs?: ICommandBarProps['overflowButtonAs'];
  @Input() buttonAs?: ICommandBarProps['buttonAs'];
  @Input() shiftOnReduce?: ICommandBarProps['shiftOnReduce'];
  @Input() className?: ICommandBarProps['className'];
  @Input() ariaLabel?: ICommandBarProps['ariaLabel'];
  @Input() styles?: ICommandBarProps['styles'];
  @Input() theme?: ICommandBarProps['theme'];
  @Input() onReduceData?: ICommandBarProps['onReduceData'];
  @Input() onGrowData?: ICommandBarProps['onGrowData'];

  @Input() items: ReadonlyArray<ICommandBarItemOptions>;
  @Input() farItems: ReadonlyArray<ICommandBarItemOptions>;
  @Input() overflowItems: ReadonlyArray<ICommandBarItemOptions>;

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  /** @internal */
  transformedItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedFarItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedOverflowItems_: ReadonlyArray<ICommandBarItemProps>;

  private readonly _subscriptions: Subscription[] = [];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }

  ngOnChanges(changes: TypedChanges<FabCommandBarComponent>) {
    if (
      changes['items'] &&
      changes['items'].previousValue !== changes['items'].currentValue &&
      changes['items'].currentValue
    )
      this._createTransformedItems(changes['items'].currentValue);
    if (
      changes['farItems'] &&
      changes['farItems'].previousValue !== changes['farItems'].currentValue &&
      changes['farItems'].currentValue
    )
      this._createTransformedFarItems(changes['farItems'].currentValue);
    if (
      changes['overflowItems'] &&
      changes['overflowItems'].previousValue !== changes['overflowItems'].currentValue &&
      changes['overflowItems'].currentValue
    )
      this._createTransformedOverflowItems(changes['overflowItems'].currentValue);

    super.ngOnChanges(changes);
  }

  ngAfterContentInit() {
    if (this.itemsDirective) this._initDirective(this.itemsDirective, 'items');
    if (this.farItemsDirective) this._initDirective(this.farItemsDirective, 'farItems');
    if (this.overflowItemsDirective) this._initDirective(this.overflowItemsDirective, 'overflowItems');
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _initDirective<TCommandBarItemsDirective extends CommandBarItemsDirectiveBase>(
    directive: TCommandBarItemsDirective,
    itemsPropertyKey: 'items' | 'farItems' | 'overflowItems'
  ) {
    const transformItemsFunc =
      (directive instanceof CommandBarItemsDirective && (newItems => this._createTransformedItems(newItems))) ||
      (directive instanceof CommandBarFarItemsDirective && (newItems => this._createTransformedFarItems(newItems))) ||
      (directive instanceof CommandBarOverflowItemsDirective &&
        (newItems => this._createTransformedOverflowItems(newItems)));
    null;

    if (!transformItemsFunc) {
      throw new Error('Invalid directive given');
    }

    const setItems = (
      mapper: (items: ReadonlyArray<ICommandBarItemOptions>) => ReadonlyArray<ICommandBarItemOptions>
    ) => {
      this[itemsPropertyKey] = mapper(this[itemsPropertyKey]);
      transformItemsFunc(this[itemsPropertyKey]);

      this.markForCheck();
    };

    // Initial items
    setItems(() => directive.items);

    // Subscribe to adding/removing items
    this._subscriptions.push(
      directive.onItemsChanged.subscribe((newItems: QueryList<CommandBarItemDirective>) => {
        setItems(() => newItems.map<ICommandBarItemOptions>(directive => directive));
      })
    );

    // Subscribe for existing items changes
    this._subscriptions.push(
      directive.onChildItemChanged.subscribe(({ key, changes }: CommandBarItemChangedPayload) => {
        setItems(items => items.map(item => (item.key === key ? mergeItemChanges(item, changes) : item)));
        this.markForCheck();
      })
    );
  }

  private _createTransformedItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedFarItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedFarItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedOverflowItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedOverflowItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    const sharedProperties = omit(itemOptions, 'renderIcon', 'render');

    // Legacy render mode is used for the icon because otherwise the icon is to the right of the text (instead of the usual left)
    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon, { legacyRenderMode: true });
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    // @ts-ignore
    return Object.assign(
      {},
      sharedProperties,
      iconRenderer && {
        onRenderIcon: (item: IContextualMenuItem) => iconRenderer({ contextualMenuItem: item }),
      },
      renderer &&
      ({ onRender: (item, dismissMenu) => renderer({ item, dismissMenu }) } as Pick<ICommandBarItemProps, 'onRender'>)
    ) as ICommandBarItemProps;
  }
}

// Not using `Omit` here since it confused the TypeScript compiler and it just showed the properties listed here (`renderIcon`, `render` and `data`).
// The type here is just `Omit` without the generics though.
export interface ICommandBarItemOptions<TData = any>
  extends Pick<ICommandBarItemProps, Exclude<KnownKeys<ICommandBarItemProps>, 'onRender' | 'onRenderIcon'>> {
  readonly renderIcon?: InputRendererOptions<ICommandBarItemOptionsRenderIconContext>;
  readonly render?: InputRendererOptions<ICommandBarItemOptionsRenderContext>;
  readonly data?: TData;
}

export interface ICommandBarItemOptionsRenderContext {
  item: any;
  dismissMenu: (ev?: any, dismissAll?: boolean) => void;
}

export interface ICommandBarItemOptionsRenderIconContext {
  contextualMenuItem: IContextualMenuItem;
}
