import { Action } from '@ngrx/store';
import { AppState } from '../app.state';

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
export const FETCHING_FAIL = 'FETCHING_FAIL';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN = 'LOGIN';
export const TOKEN_STORE = 'TOKEN_STORE';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';

export interface UserState {
  user: {
    id: number,
    name: string;
    email: string;
    token: string;
  };
  login: {
    pending: boolean;
    error: boolean;
    errors: string[]
  };
}

interface ExtendedAction extends Action {
  payload: any;
}

export function userReducer (state: UserState = AppState.user, action: ExtendedAction) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state, user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token
        }
      };
    case FETCHING_SUCCESS:
      return { ...state, login: { ...state.login, error: false, errors: [] } };
    case FETCHING_FAIL:
      return { ...state, login: { ...state.login, error: true, errors: [...action.payload] } };
    case FETCHING_USER:
      return { ...state, login: { ...state.login, pending: action.payload } };
    default:
      return state;
  }
}

