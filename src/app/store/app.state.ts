import { UserState } from './user/user.reducer';
import { UIState } from './ui/ui.reducer';

export interface IAppState {
  user: UserState;
  ui: UIState;
}

export const AppState: IAppState = {
  user: {
    user: {
      id: null,
      name: '',
      email: '',
      token: ''
    },
    login: {
      pending: false,
      error: false,
      errors: []
    }
  },
  ui: {
    sidebar: {
      state: 'close'
    }
  }
};
