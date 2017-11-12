import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, ROUTE_LOADING, SidebarState } from '../store/ui/ui.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { slideInOut } from 'app/animations/slide-in-out.animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  loader: Observable<boolean>;
  animate: Observable<string>;

  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);

  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<IAppState>
  ) {
    this.loader = store.select(state => state.ui.route.loading);
    this.animate = this.store.select(state => state.ui.sidebar.state);
  }

  ngOnInit() {
    this.store.dispatch({type: ROUTE_LOADING, payload: true});
  }

  ngAfterViewInit() { this.store.dispatch({type: ROUTE_LOADING, payload: false}); }

  ngOnDestroy() {
    this.store.dispatch({type: ROUTE_LOADING, payload: false});
    this.subscription.unsubscribe();
  }

}
