// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChild, Directive, Input, TemplateRef, ElementRef } from '@angular/core';
import { ItemChangedPayload } from '@angular-react/fabric/lib/components/core';
import { ContextualMenuItemDirective } from '@angular-react/fabric/lib/components/contextual-menu'
import {
  ICommandBarItemOptions,
  ICommandBarItemOptionsRenderContext,
  ICommandBarItemOptionsRenderIconContext,
} from '../command-bar.component';

export type CommandBarItemChangedPayload = ItemChangedPayload<ICommandBarItemOptions['key'], ICommandBarItemOptions>;

/**
 * Wrapper directive to allow rendering a custom item to a CommandBarItem.
 */
@Directive({ selector: 'fab-command-bar-item > render' })
export class CommandBarItemRenderDirective {
  @ContentChild(TemplateRef, { static: false }) readonly templateRef: TemplateRef<ICommandBarItemOptionsRenderContext>;
}

/**
 * Wrapper directive to allow rendering a custom icon to a CommandBarItem.
 */
@Directive({ selector: 'fab-command-bar-item > render-icon' })
export class CommandBarItemRenderIconDirective {
  @ContentChild(TemplateRef, { static: false }) readonly templateRef: TemplateRef<ICommandBarItemOptionsRenderIconContext>;
}

@Directive({ selector: 'fab-command-bar-item' })
export class CommandBarItemDirective extends ContextualMenuItemDirective implements ICommandBarItemOptions {
  // ICommandBarItemOptions implementation
  @Input() iconOnly?: ICommandBarItemOptions['iconOnly'];
  @Input() tooltipHostProps?: ICommandBarItemOptions['tooltipHostProps'];
  @Input() buttonStyles?: ICommandBarItemOptions['buttonStyles'];
  @Input() cacheKey?: ICommandBarItemOptions['cacheKey'];
  @Input() renderedInOverflow?: ICommandBarItemOptions['renderedInOverflow'];
  @Input() commandBarButtonAs?: ICommandBarItemOptions['commandBarButtonAs'];

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }
}
