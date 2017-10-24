import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from '../store/app.state';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');

    if (token)
      return false;

    return this.store.select(store => {

      if (store.user.user.id)
        this.router.navigate(['home']);

      return !store.user.user.id;
    });
  }
}
