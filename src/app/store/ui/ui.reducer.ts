import { Action } from '@ngrx/store';
import { AppState } from '../app.state';

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

export type SidebarState = 'open' | 'close';

export interface UIState {
  sidebar: {
    state: SidebarState;
  };
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
    default: return state;
  }
}
