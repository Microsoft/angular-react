// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ActionButton,
  CommandBarButton,
  CompoundButton,
  DefaultButton,
  IconButton,
  MessageBarButton,
  PrimaryButton,
} from 'office-ui-fabric-react/lib/Button';
import { FabActionButtonComponent } from './action-button.component';
import { FabCommandBarButtonComponent } from './command-bar-button.component';
import { FabCompoundButtonComponent } from './compound-button.component';
import { FabDefaultButtonComponent } from './default-button.component';
import { FabIconButtonComponent } from './icon-button.component';
import { FabMessageBarButtonComponent } from './messagebar-button.component';
import { FabPrimaryButtonComponent } from './primary-button.component';
import { FabSplitButtonComponent } from './split-button.component';

const components = [
  FabDefaultButtonComponent,
  FabActionButtonComponent,
  FabCommandBarButtonComponent,
  FabCompoundButtonComponent,
  FabIconButtonComponent,
  FabMessageBarButtonComponent,
  FabPrimaryButtonComponent,
  FabSplitButtonComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabButtonModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DefaultButton', () => DefaultButton);
    registerElement('ActionButton', () => ActionButton);
    registerElement('CommandBarButton', () => CommandBarButton);
    registerElement('CompoundButton', () => CompoundButton);
    registerElement('IconButton', () => IconButton);
    registerElement('MessageBarButton', () => MessageBarButton);
    registerElement('PrimaryButton', () => PrimaryButton);
  }
}
