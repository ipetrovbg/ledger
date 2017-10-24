import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './layout.routes';
import { LayoutGuard } from './layout.guard';

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent
  ],
  providers: [
    LayoutGuard
  ]
})
export class LayoutModule { }
