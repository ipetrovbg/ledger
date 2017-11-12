import { ChangeDetectionStrategy, Component, OnInit, HostBinding } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { slideInOut } from 'app/animations/slide-in-out.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [slideInOut],
  host: { '[@slideInOut]': 'animate | async' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @HostBinding('class') myClass: string;

  isNotLogged: Observable<boolean>;
  loading: Observable<boolean>;
  userName: Observable<string>;
  animate: Observable<string>;
  
  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.isNotLogged = this.store.select(store => !store.user.user.id);
    this.loading = this.store.select(store => store.ui.loading);
    this.userName = this.store.select(store => store.user.user.name);
    this.animate = this.store.select(state => state.ui.sidebar.state);
    this.isNotLogged.subscribe(logged => this.myClass = logged ? 'notLogged' : '' );
  }

}
