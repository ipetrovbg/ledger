import { UserState } from './user/user.reducer';
import { UIState } from './ui/ui.reducer';
import { PagesState } from './pages/state';

export interface IAppState {
  user: UserState;
  ui: UIState;
  pages: PagesState;
}
export function getState(store: any) {
  let _state: IAppState;
  store.take(1).subscribe(o => _state = o);
  return _state;
}

export const AppState: IAppState = {
  user: {
    user: {
      id: null,
      name: '',
      email: '',
      token: '',
    },
    settings: '',
    login: {
      pending: false,
      error: false,
      errors: []
    }
  },
  ui: {
    sidebar: {
      state: 'close'
    },
    route: {
      loading: false
    },
    loading: false,
  },
  pages: {
    profile: {
      jsonForm: {
        loading: false
      }
    }
  }
};
