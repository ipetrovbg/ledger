import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Actions, Effect } from '@ngrx/effects';

import { Action, Store } from '@ngrx/store';
import { getState, IAppState } from '../../app.state';
import { PROFILE_FORM_LOADING, PROFILE_SUBMIT } from '../pages.reducer';
import { appConfig } from '../../../app.config';
import { UPDATE_SETTINGS } from "../../user/user.reducer";

@Injectable()
export class ProfileEffects {

  @Effect() submit$: Observable<Action> = this.submit();

  constructor (
    private http: Http,
    private actions: Actions<any>,
    private store: Store<IAppState>
  ) {}

  submit(): Observable<Action> {
    return this.actions.ofType<any>(PROFILE_SUBMIT)
      .mergeMap(action => {
        return this.http.post(`${appConfig.api}/users/${getState(this.store).user.user.id}/settings`, {settings: action.payload})
          .map(r => r.json())
          .mergeMap(response => {
            return [
              ({ type: PROFILE_FORM_LOADING, payload: false }),
              ({ type: UPDATE_SETTINGS, payload: response.settings })
            ];
          }).catch(err => of({ type: PROFILE_FORM_LOADING, payload: false }));
      });
  }
}
