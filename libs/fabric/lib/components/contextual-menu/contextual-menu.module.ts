// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ContextualMenuItemDirective,
  ContextualMenuItemRenderDirective,
  ContextualMenuItemRenderIconDirective,
} from './directives/contextual-menu-item.directive';

const components = [
  ContextualMenuItemDirective,
  ContextualMenuItemRenderDirective,
  ContextualMenuItemRenderIconDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabContextualMenuModule {}
