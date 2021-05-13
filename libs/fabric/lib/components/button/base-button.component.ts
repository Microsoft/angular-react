// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ChangeableItemsHelper, mergeItemChanges } from '@angular-react/fabric/lib/components/core';
import { omit, getDataAttributes } from '@angular-react/fabric/lib/utils';
import { Subscription } from 'rxjs';

import { ContextualMenuItemDirective, IContextualMenuItemOptions } from '@angular-react/fabric/lib/components/contextual-menu';
import { CommandBarItemChangedPayload } from '@angular-react/fabric/lib/components/command-bar';

export abstract class FabBaseButtonComponent extends ReactWrapperComponent<IButtonProps>
  implements OnInit, AfterContentInit, OnDestroy {
  @Input() componentRef?: IButtonProps['componentRef'];
  @Input() href?: IButtonProps['href'];
  @Input() primary?: IButtonProps['primary'];
  @Input() uniqueId?: IButtonProps['uniqueId'];
  @Input() disabled?: IButtonProps['disabled'];
  @Input() allowDisabledFocus?: IButtonProps['allowDisabledFocus'];
  @Input() primaryDisabled?: IButtonProps['primaryDisabled'];
  @Input() styles?: IButtonProps['styles'];
  @Input() theme?: IButtonProps['theme'];
  @Input() checked?: IButtonProps['checked'];
  @Input() className?: IButtonProps['className'];
  @Input() ariaLabel?: IButtonProps['ariaLabel'];
  @Input() ariaDescription?: IButtonProps['ariaDescription'];
  @Input() ariaHidden?: IButtonProps['ariaHidden'];
  @Input() ariaSelected?: IButtonProps['aria-selected'];
  @Input() role?: IButtonProps['role'];
  @Input() tabIndex?: IButtonProps['tabIndex'];
  @Input() text?: IButtonProps['text'];
  @Input() iconProps?: IButtonProps['iconProps'];
  @Input() menuProps?: IButtonProps['menuProps'];
  @Input() split?: IButtonProps['split'];
  @Input() menuIconProps?: IButtonProps['menuIconProps'];
  @Input() splitButtonAriaLabel?: IButtonProps['splitButtonAriaLabel'];
  @Input() menuAs?: IButtonProps['menuAs'];
  @Input() secondaryText?: IButtonProps['secondaryText'];
  @Input() toggle?: IButtonProps['toggle'];
  @Input() data?: IButtonProps['data'];
  @Input() getClassNames?: IButtonProps['getClassNames'];
  @Input() getSplitButtonClassNames?: IButtonProps['getSplitButtonClassNames'];
  @Input() menuTriggerKeyCode?: IButtonProps['menuTriggerKeyCode'];
  @Input() keytipProps?: IButtonProps['keytipProps'];
  @Input() persistMenu?: IButtonProps['persistMenu'];

  @Input() renderIcon?: InputRendererOptions<IButtonProps>;
  @Input() renderText?: InputRendererOptions<IButtonProps>;
  @Input() renderDescription?: InputRendererOptions<IButtonProps>;
  @Input() renderAriaDescription?: InputRendererOptions<IButtonProps>;
  @Input() renderChildren?: InputRendererOptions<IButtonProps>;
  @Input() renderMenuIcon?: InputRendererOptions<IButtonProps>;

  @Output() readonly onClick = new EventEmitter<MouseEvent>();
  @Output() readonly onMenuClick = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; button?: IButtonProps }>();
  @Output() readonly onAfterMenuDismiss = new EventEmitter<void>();

  @ContentChildren(ContextualMenuItemDirective) readonly menuItemsDirectives?: QueryList<ContextualMenuItemDirective>;

  onRenderIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderText: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderAriaDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderChildren: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderMenuIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;

  private _changeableItemsHelper: ChangeableItemsHelper<IContextualMenuItem>;
  private _subscriptions: Subscription[] = [];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onMenuClickHandler = this.onMenuClickHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderIcon = this.createRenderPropHandler(this.renderIcon);
    this.onRenderText = this.createRenderPropHandler(this.renderText);
    this.onRenderDescription = this.createRenderPropHandler(this.renderDescription);
    this.onRenderAriaDescription = this.createRenderPropHandler(this.renderAriaDescription);
    this.onRenderChildren = this.createRenderPropHandler(this.renderChildren);
    this.onRenderMenuIcon = this.createRenderPropHandler(this.renderMenuIcon);
  }

  ngAfterContentInit() {
    if (this.menuItemsDirectives && this.menuItemsDirectives.length > 0) {
      const setItems = (directiveItems: ReadonlyArray<ContextualMenuItemDirective>) => {
        const items = directiveItems.map(directive =>
          this._transformContextualMenuItemOptionsToProps(this._directiveToContextualMenuItem(directive))
        );
        if (!this.menuProps) {
          this.menuProps = { items: items };
        } else {
          this.menuProps.items = items;
        }

        this.markForCheck();
      };

      this._changeableItemsHelper = new ChangeableItemsHelper(this.menuItemsDirectives);
      this._subscriptions.push(
        this._changeableItemsHelper.onItemsChanged.subscribe((newItems: QueryList<ContextualMenuItemDirective>) => {
          setItems(newItems.toArray());
        }),
        this._changeableItemsHelper.onChildItemChanged.subscribe(({ key, changes }: CommandBarItemChangedPayload) => {
          const newItems = this.menuItemsDirectives.map(item =>
            item.key === key ? mergeItemChanges(item, changes) : item
          );
          setItems(newItems);

          this.markForCheck();
        })
      );

      setItems(this.menuItemsDirectives.toArray());
    }
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    if (this._changeableItemsHelper) {
      this._changeableItemsHelper.destroy();
    }

    if (this._subscriptions) {
      this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  onMenuClickHandler(ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) {
    this.onMenuClick.emit({
      ev: ev && ev.nativeEvent,
      button,
    });
  }

  onClickHandler(ev?: React.MouseEvent) {
    this.onClick.emit(ev.nativeEvent);
  }

  private _directiveToContextualMenuItem(directive: ContextualMenuItemDirective): IContextualMenuItemOptions {
    return {
      ...omit(
        directive,
        'menuItemsDirectives',
        'renderDirective',
        'renderIconDirective',
        'click',
        'onItemChanged',
        'onItemsChanged',
        'onChildItemChanged',
        'ngOnInit',
        'ngOnChanges',
        'ngOnDestroy',
        'ngAfterContentInit'
      ),
      ...getDataAttributes(directive.elementRef.nativeElement, true),
      onClick: (ev, item) => {
        directive.click.emit({ ev: ev && ev.nativeEvent, item: item });
      },
    };
  }

  private _transformContextualMenuItemOptionsToProps(itemOptions: IContextualMenuItemOptions): IContextualMenuItem {
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
        ({
          onRender: (item, dismissMenu) => renderer({ item, dismissMenu }),
        } as Pick<IContextualMenuItem, 'onRender'>)
    ) as IContextualMenuItem;
  }
}
