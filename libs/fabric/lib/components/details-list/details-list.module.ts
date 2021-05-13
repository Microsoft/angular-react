// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@angular-react/core';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';

import { FabGroupModule } from '@angular-react/fabric/lib/components/group';
import { FabDetailsListComponent } from './details-list.component';
import {
  DetailsListColumnDirective,
  DetailsListColumnRenderDirective,
} from './directives/details-list-column.directive';
import { DetailsListColumnsDirective } from './directives/details-list-columns.directive';
import { DetailsListGroupsDirective } from './directives/details-list-groups.directive';

const components = [
  DetailsListColumnDirective,
  DetailsListColumnRenderDirective,
  DetailsListColumnsDirective,
  DetailsListGroupsDirective,
  FabDetailsListComponent,
];

@NgModule({
  imports: [CommonModule, FabGroupModule],
  declarations: components,
  exports: [...components, FabGroupModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabDetailsListModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DetailsList', () => DetailsList);
  }
}
