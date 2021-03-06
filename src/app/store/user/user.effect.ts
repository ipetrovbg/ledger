import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Socket } from 'ng-socket-io';

import {
  AUTO_LOGIN, FETCH_SETTINGS, FETCHING_FAIL, FETCHING_SUCCESS, FETCHING_USER, LOGIN, LOGOUT, UPDATE_SETTINGS,
  UPDATE_USER
} from './user.reducer';

import { appConfig } from '../../app.config';
import { Router } from '@angular/router';
import { User } from './user.model';
import { getState, IAppState } from '../app.state';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, UI_LOADING } from '../ui/ui.reducer';

@Injectable()
export class UserEffects {

  @Effect() login$: Observable<Action> = this.login();
  @Effect() autoLogin$: Observable<Action> = this.autoLogin();
  @Effect() logout$: Observable<Action> = this.logout();
  @Effect() fetchSettings$: Observable<Action> = this.fetchSettings();

  constructor (
    private http: Http,
    private actions: Actions<any>,
    private router: Router,
    private store: Store<IAppState>,
    private socket: Socket
  ) {
    socket.on(UPDATE_SETTINGS, data => store.dispatch(data));
  }

  private login (): Observable<Action> {

    return this.actions.ofType<any>(LOGIN)
      .mergeMap(action => {
          return this.http.post(appConfig.api + '/authenticate', action.payload)
            .map(res => res.json())
            .mergeMap(data => {
              const { token, user, success, message } = data;

              const buildUser = new User();

              if (success) {
                buildUser.attach(user);
                buildUser.token = token;
                localStorage.setItem('token', token);
                this.router.navigate(['/layout/dashboard']);
                return [
                  ({ type: FETCHING_SUCCESS }),
                  ({ type: UPDATE_USER, payload: buildUser }),
                  ({ type: FETCHING_USER, payload: false })
                ];
              } else {
                return [
                  ({ type: FETCHING_USER, payload: false }),
                  ({ type: UPDATE_USER, payload: buildUser }),
                  ({ type: FETCHING_FAIL, payload: [message] })
                ];
              }
            })
            .catch(error => of({ type: FETCHING_FAIL, payload: [error.message] }));
        }
      );
  }

  private logout(): Observable<Action> {
    return this.actions.ofType<any>(LOGOUT)
      .mergeMap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        return [({type: UPDATE_USER, payload: new User()})];
      });
  }

  private autoLogin (): Observable<Action> {
    return this.actions.ofType<any>(AUTO_LOGIN)
      .mergeMap(() => {
        this.socket.emit('test', { test: 'test message' });
        const token = localStorage.getItem('token');

        if (!getState(this.store).user.user.id)
          return this.getUserByTokenAndCreateAction(token);
        else
          return [({type: UPDATE_USER, payload: getState(this.store).user.user})];
      });
  }

  private getUserByTokenAndCreateAction(token): Observable<Action> {
    return this.http.get(`${appConfig.api}/authenticate/${token}`)
      .map(res => res.json())
      .mergeMap(responseToken => {
        const user = new User();
        if (!responseToken.token) {
          localStorage.removeItem('token');
          return [({ type: UPDATE_USER, payload: user })];
        }
        return this.getUserAndDispatch(responseToken.token.id, token);
      });
  }

  private getUserAndDispatch(id, token): Observable<Action> {
    return this.http.get(`${appConfig.api}/users/${id}`)
      .map(res => res.json())
      .mergeMap(response => {
        const user = new User();
        if (response.success) {
          user.attach(response.response);
          user.token = token;
          return [({ type: UPDATE_USER, payload: user }), ({type: FETCH_SETTINGS})];
        }
        return [({ type: UPDATE_USER, payload: user })];
      });
  }

  private fetchSettings() {
    return this.actions.ofType<any>(FETCH_SETTINGS)
      .mergeMap(() => {
        if (!getState(this.store).user.user.id)
          return [({type: 'EMPTY'})];

        return this.http.get(`${appConfig.api}/users/${ getState(this.store).user.user.id}/settings`)
          .map(res => res.json())
          .mergeMap(response => {
            return [
              ({type: UPDATE_SETTINGS, payload: { settings: response.settings, id: getState(this.store).user.user.id }}),
              ({type: UI_LOADING, payload: false })
            ];
          });
      }).catch(err => {
        console.log('FETCH_SETTINGS error', err);
        this.store.dispatch({type: UI_LOADING, payload: false });
        return of({ type: 'EMPTY' });
      });
  }

}
