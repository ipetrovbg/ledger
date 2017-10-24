/* Angular Core Modules */
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { RegisterComponent } from './register/register.component';

/* Application Modules */

/* Application Components */

/*
 canActivate: [ AuthGuard ]
 */
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ LoginGuard ] },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
];
