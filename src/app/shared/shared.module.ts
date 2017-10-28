import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppButtonComponent } from './app-button/app-button.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  CalendarModule,
  DateInputsModule,
  DatePickerModule
} from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { RippleDirective } from 'angular-ripple-effect/ripple.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const kendoUIModules = [
  ButtonsModule,
  CalendarModule,
  DateInputsModule,
  DatePickerModule,
  RippleModule,
  InputsModule,
  DialogModule,
];

const imports = [
  ...kendoUIModules,
  CommonModule,
  ReactiveFormsModule
];
const declarations = [
  AppButtonComponent,
  RippleDirective,
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
export class SharedModule {}
