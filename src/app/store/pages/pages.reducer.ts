import { PagesState } from './state';
import { AppState } from '../app.state';
import { Action } from '@ngrx/store';

interface PagesAction extends Action {
  payload?: any;
}

export const PROFILE_FORM_LOADING = 'PROFILE_FORM_LOADING';
export const PROFILE_SUBMIT = 'PROFILE_SUBMIT';

export function pagesReducer(state: PagesState = AppState.pages, action: PagesAction): PagesState {
  switch (action.type) {
    case PROFILE_FORM_LOADING:
      return { ...state, profile: { ...state.profile, jsonForm: { ...state.profile.jsonForm, loading: action.payload } }};
    default: return state;
  }
}
