// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TeachingBubble } from 'office-ui-fabric-react';
import { FabTeachingBubbleComponent } from './teaching-bubble.component';

const components = [FabTeachingBubbleComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabTeachingBubbleModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('TeachingBubble', () => TeachingBubble);
  }
}
