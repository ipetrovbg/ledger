import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Store } from '@ngrx/store';
import { showAnimation } from 'app/animations/slide-in-out.animation';
import { IAppState } from 'app/store/app.state';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  animations: [showAnimation],
  styleUrls: ['./ledger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedgerComponent implements OnInit, OnDestroy, AfterViewInit {

  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscription
      .add(this.store.subscribe(state => setTimeout(() => this.visible.next((state.ui.loading)), 205)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
