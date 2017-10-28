import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, ROUTE_LOADING, SidebarState } from '../store/ui/ui.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  loader: Observable<boolean>;

  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);

  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<IAppState>
  ) {
    this.loader = store.select(state => state.ui.route.loading);
  }

  ngOnInit() {
    this.store.dispatch({type: OPEN_SIDEBAR});
    this.store.dispatch({type: ROUTE_LOADING, payload: true});
  }

  ngAfterViewInit() { this.store.dispatch({type: ROUTE_LOADING, payload: false}); }

  ngOnDestroy() {
    this.store.dispatch({type: CLOSE_SIDEBAR});
    this.store.dispatch({type: ROUTE_LOADING, payload: false});
    this.subscription.unsubscribe();
  }

}
