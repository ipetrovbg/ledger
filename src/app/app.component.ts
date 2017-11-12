import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './store/app.state';
import { FETCHING_USER, LOGIN, UPDATE_USER, UserState } from './store/user/user.reducer';
import { UserService } from './store/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { slideInOutAnimation } from 'app/animations/slide-in-out.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInOutAnimation,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isLogged: Observable<boolean>;
  constructor(
    private store: Store<IAppState>
  ) {
    this.isLogged = store.select(store => !store.user.user.id);
  }
}
