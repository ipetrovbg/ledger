import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { LayoutGuard } from './layout.guard';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    canActivate: [ LayoutGuard ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
