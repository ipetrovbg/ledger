import { UserState } from './user/user.reducer';

export interface IAppState {
  user: UserState;
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
  }
};
