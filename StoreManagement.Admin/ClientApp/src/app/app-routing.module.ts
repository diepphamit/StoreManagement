import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users-management/users-management.module').then(m => m.UsersManagementModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'orderproducts',
        loadChildren: () => import('./pages/order-product/order-product.module').then(m => m.OrderProductModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./pages/chartdemo/chartdemo.module').then(m => m.ChartdemoModule)
      },
      {
        path: 'pictures',
        loadChildren: () => import('./pages/picture/picture.module').then(m => m.PictureModule)
      },
      {
        path: 'suppliers',
        loadChildren: () => import('./pages/supplier/supplier.module').then(m => m.SupplierModule)
      },
      {
        path: 'orderdetails',
        loadChildren: () => import('./pages/order-detail/order-detail.module').then(m => m.OrderDetailModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'branches',
        loadChildren: () => import('./pages/branch/branch.module').then(m => m.BranchModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
