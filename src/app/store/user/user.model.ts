export class User {
  id: number;
  name: string;
  email: string;
  token: string;

  constructor(user?) {
    this.attach(user);
  }

  attach(user?) {
    this.id = user && user.id ? user.id : null;
    this.name = user && user.name ? user.name : '';
    this.email = user && user.email ? user.email : '';
    this.token = user && user.token ? user.token : '';
  }

}
