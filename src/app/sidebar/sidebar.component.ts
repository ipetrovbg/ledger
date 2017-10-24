import { Component, OnDestroy, OnInit } from '@angular/core';

import { slideInOutAnimation } from '../animations/slide-in-out.animation';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IAppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': 'animate | async' }
})
export class SidebarComponent {
  animate: Observable<string>;
  constructor(
    private store: Store<IAppState>
  ) {
    this.animate = store.select(state => state.ui.sidebar.state);
  }

}
