import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StatisticalComponent } from './statistical.component';
import { StatisticalStaffComponent } from './statistical-staff/statistical-staff.component';
import { StatisticalCustomerComponent } from './statistical-customer/statistical-customer.component';
import { StatisticalProductComponent } from './statistical-product/statistical-product.component';
import { RemainProductComponent } from './remain-product/remain-product.component';


export const routes: Routes = [
    {
        path: '', component: StatisticalComponent,
    },
    {
      path: 'staff', component: StatisticalStaffComponent,
    },
    {
      path: 'customer', component: StatisticalCustomerComponent,
    },
    {
      path: 'productsoles', component: StatisticalProductComponent,
    },
    {
      path: 'productremains', component: RemainProductComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StatisticalRoutingModule { }
