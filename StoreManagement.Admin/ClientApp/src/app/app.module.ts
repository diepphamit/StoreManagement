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
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.sevice';
import { PictureService } from './services/picture.service';
import { SupplierService } from './services/supplier.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AuthGuard } from './services/auth-guard.service';
import { ValidationService } from './services/validation.service';
import { OrderModule } from './pages/order/order.module';
import { OrderService } from './services/order.service';
import { OrderProductService } from './services/order-product.service';
import { OrderDetailService } from './services/order-detail.service';
import { Branch } from './models/branch/branch.model';
import { BranchService } from './services/branch.service';



export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN);
}

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
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
  }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
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
    AuthGuard,
    ValidationService,
    PictureService,
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    OrderDetailService,
    SupplierService,
    OrderService,
    OrderProductService,
    BranchService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
