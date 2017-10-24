import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/app.state';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: Observable<boolean>;
  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.isLogged = this.store.select(store => !store.user.user.id);
  }

}
