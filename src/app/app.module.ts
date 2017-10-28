import { NgModule } from '@angular/core';
import { GuardsCheckEnd, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appRoutes } from './app-routes';

import { AppComponent } from './app.component';
import { UserEffects } from './store/user/user.effect';
import { UserService } from './store/user/user.service';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import { AUTO_LOGIN, userReducer } from './store/user/user.reducer';
import { OPEN_SIDEBAR, ROUTE_LOADING, uiReducer } from './store/ui/ui.reducer';
import { IAppState } from './store/app.state';
import { pagesReducer } from "./store/pages/pages.reducer";
import { ProfileEffects } from "./store/pages/profile/profile.effects";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot({ user: userReducer, ui: uiReducer, pages: pagesReducer }),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      UserEffects,
      ProfileEffects,
    ]),
    SharedModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private store: Store<IAppState>,
    router: Router
  ) {
    store.dispatch({type: AUTO_LOGIN});
    router.events.subscribe(route => {
      if ((route instanceof GuardsCheckEnd) && (route.url.indexOf('/layout') > -1 && route.shouldActivate)) {
        store.dispatch({type: OPEN_SIDEBAR});
        this.store.dispatch({type: ROUTE_LOADING, payload: true});
      }
    });
  }
}
