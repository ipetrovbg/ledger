import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { IAppState } from '../store/app.state';

@Injectable()
export class LayoutGuard implements CanActivate {

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');

    if (token)
      return true;

    return this.store.select(store => {
      if (!store.user.user.id)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/layout/dashboard']);

      return !!store.user.user.id;
    });
  }
}
