import { Component, OnDestroy, OnInit } from '@angular/core';

import { slideInOutAnimation } from '../animations/slide-in-out.animation';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IAppState, getState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { UserState } from "../store/user/user.reducer";
import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from "../store/ui/ui.reducer";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': 'animate | async' }
})
export class SidebarComponent {
  animate: Observable<string>;
  user: Observable<UserState>;
  constructor(
    private store: Store<IAppState>
  ) {
    this.animate = store.select(state => state.ui.sidebar.state);
    this.user = store.select(state => state.user);
  }

  toggleSidebar() {
    getState(this.store).ui.sidebar.state === 'open' ?
      this.store.dispatch({type: CLOSE_SIDEBAR}) :
      this.store.dispatch({type: OPEN_SIDEBAR});
  }

}
