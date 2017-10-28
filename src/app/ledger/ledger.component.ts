import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
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
      .add(this.store.subscribe(state => setTimeout(() => this.visible.next((state.ui.loading)), 501)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
