import { Action } from '@ngrx/store';
import { AppState } from '../app.state';

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const ROUTE_LOADING = 'ROUTE_LOADING';
export const UI_LOADING = 'UI_LOADING';

export type SidebarState = 'open' | 'close';

export interface UIState {
  sidebar: {
    state: SidebarState;
  };
  route: {
    loading: boolean;
  };
  loading: boolean;
}
interface ExtendedAction extends Action {
  payload: any;
}

export function uiReducer (state: UIState = AppState.ui, action: ExtendedAction) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { ...state, sidebar: { ...state.sidebar, state: 'open' }};
    case CLOSE_SIDEBAR:
      return { ...state, sidebar: { ...state.sidebar, state: 'close' }};
    case ROUTE_LOADING:
      return { ...state, route: { ...state.route, loading: action.payload }};
    case UI_LOADING:
      return { ...state, loading: action.payload};
    default: return state;
  }
}
