import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as moment from 'moment';

import { IAppState } from '../../store/app.state';
import { PROFILE_FORM_LOADING, PROFILE_SUBMIT } from '../../store/pages/pages.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements AfterViewInit, OnDestroy, OnInit {
  visible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  subscription: Subscription = new Subscription();
  loading: Observable<boolean>;
  user: Observable<any>;
  settings: Observable<string>;
  remainingDays: Observable<any>;
  /**
   * internal state
   * @type {BehaviorSubject}
   */
  state: BehaviorSubject<any> = new BehaviorSubject({});

  form: FormGroup;

  public opened: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      settings: ['', Validators.required]
    });

    this.form.get('settings').valueChanges.debounceTime(100).subscribe(settings => {
      if (!settings || (settings && !settings.length))
        this.form.setErrors({...this.form.errors, required: 'Empty JSON field'});
      try {
        JSON.parse(this.form.get('settings').value);
      } catch (e) {
        this.form.setErrors({ ...this.form.errors, jsonError: 'Invalid JSON' });
      }
    });

    this.user = this.store.select(state => state.user.user);
    this.loading = this.store.select(state => state.pages.profile.jsonForm.loading);
    this.settings = this.store.select(state => {
      try {
        return JSON.parse(state.user.settings);
      } catch ( e ) {
        return state.user.settings;
      }
    });

    this.settings.debounceTime(1000)
      .subscribe((settings: any) => {
      this.form.setValue({settings: JSON.stringify(settings)});
      this.form.markAsPristine();
    });

    /**
     * create re selector
     * @type {Observable<number>}
     */
    this.remainingDays = Observable.combineLatest(this.settings)
      .map(([settings]) => ({settings}))
      .map((response: any) => {
        const { settings } = response;

        const day = moment();
        const payDay = settings.payDay ? settings.payDay : 1;

        return (payDay > (+new Date().getDate() + 1)) ?
          Math.abs(day.diff(moment([new Date().getFullYear(), new Date().getMonth(), payDay]), 'days')) + 1 :
          (+moment().endOf('month').format('D') - (+moment(day).format('D'))) + payDay;
    });

  }

  onSave() {
    this.store.dispatch({ type: PROFILE_FORM_LOADING, payload: true });
    if (this.form.invalid) {
      setTimeout(() => this.store.dispatch({ type: PROFILE_FORM_LOADING, payload: false }), 300);
      return;
    }
    this.store.dispatch({ type: PROFILE_SUBMIT, payload: this.form.get('settings').value });
  }

  ngAfterViewInit() {
    this.subscription
      .add(this.store.subscribe(state => setTimeout(() => this.visible.next((state.ui.loading)), 501)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
