import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, SidebarState } from '../store/ui/ui.reducer';
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
  animate: Observable<SidebarState>;

  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);

  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<IAppState>
  ) {
    this.animate = store.select(state => state.ui.sidebar.state);
  }

  ngOnInit() {
    this.store.dispatch({type: OPEN_SIDEBAR});
  }

  ngAfterViewInit() {
    this.subscription.add(this.store.subscribe(state => {
      setTimeout(() => {
        this.visible.next((state.ui.sidebar.state !== 'open'));
      }, 900);
    }));
  }
  ngOnDestroy() {
    this.store.dispatch({type: CLOSE_SIDEBAR});
    this.subscription.unsubscribe();
  }

}
