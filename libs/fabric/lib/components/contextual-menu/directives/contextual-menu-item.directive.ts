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
  ContentChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { KnownKeys, InputRendererOptions } from '@angular-react/core';
import { getDataAttributes } from '@angular-react/fabric/lib/utils';
import { ItemChangedPayload, ChangeableItemsHelper, IChangeableItemsContainer, ChangeableItemDirective } from '@angular-react/fabric/lib/components/core';
import { OnChanges } from '@angular-react/fabric/lib/declarations';

export type ContextualMenuItemChangedPayload = ItemChangedPayload<
  IContextualMenuItemOptions['key'],
  IContextualMenuItemOptions
>;

/**
 * Wrapper directive to allow rendering a custom item to a ContextualMenuItem.
 */
@Directive({ selector: 'fab-command-bar-item > render' })
export class ContextualMenuItemRenderDirective {
  @ContentChild(TemplateRef, { static: false }) readonly templateRef: TemplateRef<IContextualMenuItemOptionsRenderContext>;
}

/**
 * Wrapper directive to allow rendering a custom icon to a ContextualMenuItem.
 */
@Directive({ selector: 'fab-command-bar-item > render-icon' })
export class ContextualMenuItemRenderIconDirective {
  @ContentChild(TemplateRef, { static: false }) readonly templateRef: TemplateRef<IContextualMenuItemOptionsRenderIconContext>;
}

@Directive({ selector: 'contextual-menu-item' })
export class ContextualMenuItemDirective extends ChangeableItemDirective<IContextualMenuItem>
  implements
    AfterContentInit,
    IChangeableItemsContainer<IContextualMenuItem>,
    IContextualMenuItem,
    OnChanges<ContextualMenuItemDirective>,
    OnDestroy {
  @ContentChildren(ContextualMenuItemDirective) readonly menuItemsDirectives: QueryList<ContextualMenuItemDirective>;
  @ContentChild(ContextualMenuItemRenderDirective, { static: false }) readonly renderDirective: ContextualMenuItemRenderDirective;
  @ContentChild(ContextualMenuItemRenderIconDirective, { static: false })
  readonly renderIconDirective: ContextualMenuItemRenderIconDirective;

  @Input() componentRef?: IContextualMenuItem['componentRef'];
  @Input() text?: IContextualMenuItem['text'];
  @Input() secondaryText?: IContextualMenuItem['secondaryText'];
  @Input() itemType?: IContextualMenuItem['itemType'];
  @Input() iconProps?: IContextualMenuItem['iconProps'];
  @Input() submenuIconProps?: IContextualMenuItem['submenuIconProps'];
  @Input() disabled?: IContextualMenuItem['disabled'];
  @Input() primaryDisabled?: IContextualMenuItem['primaryDisabled'];
  @Input() shortCut?: IContextualMenuItem['shortCut'];
  @Input() canCheck?: IContextualMenuItem['canCheck'];
  @Input() checked?: IContextualMenuItem['checked'];
  @Input() split?: IContextualMenuItem['split'];
  @Input() data?: IContextualMenuItem['data'];
  @Input() href?: IContextualMenuItem['href'];
  @Input() target?: IContextualMenuItem['target'];
  @Input() rel?: IContextualMenuItem['rel'];
  @Input() subMenuProps?: IContextualMenuItem['subMenuProps'];
  @Input() getItemClassNames?: IContextualMenuItem['getItemClassNames'];
  @Input() itemProps?: IContextualMenuItem['itemProps'];
  @Input() getSplitButtonVerticalDividerClassNames?: IContextualMenuItem['getSplitButtonVerticalDividerClassNames'];
  @Input() sectionProps?: IContextualMenuItem['sectionProps'];
  @Input() className?: IContextualMenuItem['className'];
  @Input() style?: IContextualMenuItem['style'];
  @Input() ariaLabel?: IContextualMenuItem['ariaLabel'];
  @Input() title?: IContextualMenuItem['title'];
  @Input() onMouseDown?: IContextualMenuItem['onMouseDown'];
  @Input() role?: IContextualMenuItem['role'];
  @Input() customOnRenderListLength?: IContextualMenuItem['customOnRenderListLength'];
  @Input() keytipProps?: IContextualMenuItem['keytipProps'];
  @Input() inactive?: IContextualMenuItem['inactive'];
  @Input() name?: IContextualMenuItem['name'];
  @Input() render: IContextualMenuItemOptions['render'];
  @Input() renderIcon: IContextualMenuItemOptions['renderIcon'];

  @Output() readonly click = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; item?: IContextualMenuItem }>();

  @Output()
  get onChildItemChanged(): EventEmitter<ItemChangedPayload<string, IContextualMenuItem>> {
    return this._changeableItemsHelper && this._changeableItemsHelper.onChildItemChanged;
  }

  @Output()
  get onItemsChanged(): EventEmitter<QueryList<ChangeableItemDirective<IContextualMenuItem>>> {
    return this._changeableItemsHelper && this._changeableItemsHelper.onItemsChanged;
  }

  constructor(readonly elementRef: ElementRef<HTMLElement>) {
    super();
  }

  private _changeableItemsHelper: ChangeableItemsHelper<IContextualMenuItem>;

  ngAfterContentInit() {
    if (this.renderDirective && this.renderDirective.templateRef) {
      this.render = this.renderDirective.templateRef;
    }

    if (this.renderIconDirective && this.renderIconDirective.templateRef) {
      this.renderIcon = this.renderIconDirective.templateRef;
    }

    this._changeableItemsHelper = new ChangeableItemsHelper(this.menuItemsDirectives, this, nonSelfDirective => {
      const items = nonSelfDirective.map(directive => this._directiveToContextualMenuItem(directive as any));
      if (!this.subMenuProps) {
        this.subMenuProps = { items: items };
      } else {
        this.subMenuProps.items = items;
      }
    });
  }

  ngOnDestroy() {
    this._changeableItemsHelper.destroy();
  }

  private _directiveToContextualMenuItem(directive: ContextualMenuItemDirective): IContextualMenuItem {
    return {
      ...directive,
      ...getDataAttributes(directive.elementRef.nativeElement, true),
      onClick: (ev, item) => {
        directive.click.emit({ ev: ev && ev.nativeEvent, item: item });
      },
    };
  }
}

// Not using `Omit` here since it confused the TypeScript compiler and it just showed the properties listed here (`renderIcon`, `render` and `data`).
// The type here is just `Omit` without the generics though.
export interface IContextualMenuItemOptions<TData = any>
  extends Pick<IContextualMenuItem, Exclude<KnownKeys<IContextualMenuItem>, 'onRender' | 'onRenderIcon'>> {
  readonly renderIcon?: InputRendererOptions<IContextualMenuItemOptionsRenderIconContext>;
  readonly render?: InputRendererOptions<IContextualMenuItemOptionsRenderContext>;
  readonly data?: TData;

  /**
   * For any attributes like data-* etc.
   */
  [propertyName: string]: any;
}

export interface IContextualMenuItemOptionsRenderContext {
  item: any;
  dismissMenu: (ev?: any, dismissAll?: boolean) => void;
}

export interface IContextualMenuItemOptionsRenderIconContext {
  contextualMenuItem: IContextualMenuItem;
}
