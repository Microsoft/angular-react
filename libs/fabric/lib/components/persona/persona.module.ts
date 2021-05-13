// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Persona, PersonaCoin } from 'office-ui-fabric-react/lib/Persona';
import { FabPersonaCoinComponent, FabPersonaComponent } from './persona.component';

const components = [FabPersonaComponent, FabPersonaCoinComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabPersonaModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Persona', () => Persona);
    registerElement('PersonaCoin', () => PersonaCoin);
  }
}
