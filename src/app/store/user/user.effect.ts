import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { FETCHING_FAIL, FETCHING_SUCCESS, FETCHING_USER, LOGIN, UPDATE_USER } from './user.reducer';
import { IAppState } from '../../app.state';

@Injectable()
export class UserEffects {
  api = 'https://ancient-fjord-87958.herokuapp.com/api/v1/authenticate';

  @Effect() login$: Observable<Action> = this.login();

  constructor(
    private http: Http,
    private actions: Actions<any>
  ) {}

  login(): Observable<Action> {

    let buildUser = {
      name: '',
      email: '',
      id: null,
      token: ''
    };

    return this.actions.ofType<any>(LOGIN)
      .mergeMap(action => {
          return this.http.post(this.api, action.payload)
            .map(res => res.json())
            .mergeMap(data => {
              const { token, user, success, message } = data;
              if (success) {

                buildUser = user;
                buildUser.token = token;

                return [
                  ({type: FETCHING_SUCCESS}),
                  ({type: UPDATE_USER, payload: buildUser}),
                  ({type: FETCHING_USER, payload: false})
                ];
              } else {
                return [
                  ({type: FETCHING_USER, payload: false}),
                  ({type: UPDATE_USER, payload: buildUser}),
                  ({type: FETCHING_FAIL, payload: [message]})
                ];
              }
            })
            .catch(error => of({type: FETCHING_FAIL, payload: [error.message]}));
        }
      );
  }
}
