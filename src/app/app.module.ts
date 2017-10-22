import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effect';
import { UserService } from './store/user/user.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      UserEffects,
    ]),
    SharedModule,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
