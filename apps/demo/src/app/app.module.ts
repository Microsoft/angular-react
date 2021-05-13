import { AngularReactBrowserModule } from '@angular-react/core';
import {
  FabBreadcrumbModule,
  FabButtonModule,
  FabCalendarModule,
  FabCalloutModule,
  FabCheckboxModule,
  FabChoiceGroupModule,
  FabComboBoxModule,
  FabCommandBarModule,
  FabDatePickerModule,
  FabDetailsListModule,
  FabDialogModule,
  FabDividerModule,
  FabFabricModule,
  FabDropdownModule,
  FabGroupModule,
  FabGroupedListModule,
  FabHoverCardModule,
  FabIconModule,
  FabImageModule,
  FabLinkModule,
  FabMarqueeSelectionModule,
  FabMessageBarModule,
  FabModalModule,
  FabPanelModule,
  FabPersonaModule,
  FabPivotModule,
  FabSearchBoxModule,
  FabShimmerModule,
  FabSliderModule,
  FabSpinnerModule,
  FabToggleModule,
  FabTooltipModule,
  FabSpinButtonModule,
  FabTextFieldModule,
  FabPeoplePickerModule,
  FabTagPickerModule,
  FabProgressIndicatorModule,
  FabTeachingBubbleModule
} from '@angular-react/fabric';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    FabFabricModule,
    FabIconModule,
    FabButtonModule,
    FabDialogModule,
    FabImageModule,
    FabDropdownModule,
    FabPanelModule,
    FabCommandBarModule,
    FabBreadcrumbModule,
    FabCalloutModule,
    FabCheckboxModule,
    FabChoiceGroupModule,
    FabComboBoxModule,
    FabGroupedListModule,
    FabDatePickerModule,
    FabDividerModule,
    FabSpinnerModule,
    FabToggleModule,
    FabPersonaModule,
    FabPivotModule,
    FabLinkModule,
    FabMessageBarModule,
    FabHoverCardModule,
    FabModalModule,
    FabTooltipModule,
    FabShimmerModule,
    FabSliderModule,
    FabSearchBoxModule,
    FabCalendarModule,
    FabDetailsListModule,
    FabGroupModule,
    FabMarqueeSelectionModule,
    FabSpinButtonModule,
    FabTextFieldModule,
    FabPeoplePickerModule,
    FabTagPickerModule,
    FabProgressIndicatorModule,
    FabTeachingBubbleModule
  ],
  declarations: [AppComponent, CounterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
