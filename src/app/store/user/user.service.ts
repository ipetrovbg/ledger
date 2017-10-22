import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { FETCHING_USER, LOGIN } from './user.reducer';
import { IAppState } from '../app.state';

@Injectable()
export class UserService {

  constructor(
    private store: Store<IAppState>
  ) {}

  login(credentials: { email: string, password: string }) {
    this.store.dispatch({ type: FETCHING_USER, payload: true });
    this.store.dispatch({ type: LOGIN, payload: credentials });
  }

}
