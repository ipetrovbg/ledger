import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isLogged: Observable<boolean>;
  loading: Observable<boolean>;
  userName: Observable<string>;
  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.isLogged = this.store.select(store => !store.user.user.id);
    this.loading = this.store.select(store => store.ui.loading);
    this.userName = this.store.select(store => store.user.user.name);
  }

}
