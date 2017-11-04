import { NgModule } from '@angular/core';
import { AppButtonComponent } from './app-button/app-button.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  CalendarModule,
  DateInputsModule,
  DatePickerModule
} from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { RippleDirective } from 'angular-ripple-effect/ripple.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyService } from './services/hotkey.service';

const kendoUIModules = [
  ButtonsModule,
  CalendarModule,
  DateInputsModule,
  DatePickerModule,
  RippleModule,
  InputsModule,
  DialogModule,
  GridModule,
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
const exportedModules = [
  ...imports,
  ...declarations,
];

@NgModule({
  declarations: declarations,
  imports: imports,
  providers: [
    HotkeyService
  ],
  exports: exportedModules
})
export class SharedModule {}
