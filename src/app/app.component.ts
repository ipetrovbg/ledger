import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './store/app.state';
import { FETCHING_USER, LOGIN, UPDATE_USER, UserState } from './store/user/user.reducer';
import { UserService } from './store/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  user$: Observable<UserState>;
  form: FormGroup;
  constructor(
    private store: Store<IAppState>,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user$ = this.store.select(store => store.user);
    this.user$.subscribe(user => user.user.id ?
      this.form.patchValue({email: '', password: ''}) :
      undefined);
  }

  addTest(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.form.valid)
      this.userService.login(this.form.value);
  }
}
