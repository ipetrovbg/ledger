import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { products } from './products';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  subscription: Subscription = new Subscription();
  private gridData: any[] = products;
  constructor(
    private store: Store<IAppState>
  ) {}

  ngAfterViewInit() {
    this.subscription
      .add(this.store.subscribe(state => setTimeout(() => this.visible.next((state.ui.loading)), 501)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
