import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './layout.routes';
import { LayoutGuard } from './layout.guard';
import { ProfileComponent } from './profile/profile.component';
import { GuardsCheckEnd, GuardsCheckStart, Router } from '@angular/router';
import { getState, IAppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { CLOSE_SIDEBAR, OPEN_SIDEBAR, ROUTE_LOADING, UI_LOADING } from '../store/ui/ui.reducer';
import { SharedModule } from '../shared/shared.module';
import { LedgerComponent } from './ledger/ledger.component';
import { FETCH_SETTINGS } from "../store/user/user.reducer";
import { HotkeyService } from '../shared/services/hotkey.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProfileComponent,
    LedgerComponent
  ],
  providers: [
    LayoutGuard
  ]
})
export class LayoutModule {
  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private hotkeys: HotkeyService
  ) {
    router.events.subscribe(route => {
      if ((route instanceof GuardsCheckStart) && (route.url.indexOf('/layout') > -1)) {
        setTimeout(() => {
          this.store.dispatch({ type: ROUTE_LOADING, payload: false });
          if (!getState(this.store).user.settings) {
            this.store.dispatch({ type: FETCH_SETTINGS });
            this.store.dispatch({ type: UI_LOADING, payload: true });
          }
        }, 200);
      }

      if ((route instanceof GuardsCheckEnd) && (route.url.indexOf('/layout') > -1 && route.shouldActivate)) {
        this.store.dispatch({type: ROUTE_LOADING, payload: true});
      }
    });

    this.hotkeys.registerGeneralShortcuts();
  }
}
