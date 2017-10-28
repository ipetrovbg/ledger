import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { LayoutGuard } from './layout.guard';
import { ProfileComponent } from './profile/profile.component';
import { LedgerComponent } from '../ledger/ledger.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'ledgers', component: LedgerComponent },
      { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    canActivate: [ LayoutGuard ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
