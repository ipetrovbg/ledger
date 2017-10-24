import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { UserService } from '../store/user/user.service';
import { IAppState } from '../store/app.state';
import { UserState } from '../store/user/user.reducer';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
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

  login(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.form.valid)
      this.userService.login(this.form.value);
  }
}
