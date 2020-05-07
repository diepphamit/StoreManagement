import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { ACCESS_TOKEN } from './constants/db-keys';
import { JwtModule } from '@auth0/angular-jwt';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
  }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(ACCESS_TOKEN);
        },
          whitelistedDomains: [
              'localhost:5000',
              'localhost:44327'
          ],
          blacklistedRoutes: [
              'localhost:5000/api/auth/login',
              'localhost:44327/api/auth/login'
          ]
      }
  }),
  ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
