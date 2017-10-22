import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppButtonComponent } from './app-button/app-button.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  CalendarModule,
  DateInputsModule,
  DatePickerModule
} from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { RippleModule } from '@progress/kendo-angular-ripple';

const kendoUIModules = [
  ButtonsModule,
  CalendarModule,
  DateInputsModule,
  DatePickerModule,
  RippleModule,
  InputsModule,
];
const imports = [
  ...kendoUIModules,
  BrowserModule,
];
const declarations = [
  AppButtonComponent
];
const exports = [
  ...imports,
  ...declarations,
];

@NgModule({
  declarations: declarations,
  imports: imports,
  providers: [],
  exports: exports
})
export class SharedModule {
}
