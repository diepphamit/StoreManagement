import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StatisticalComponent } from './statistical.component';
import { StatisticalStaffComponent } from './statistical-staff/statistical-staff.component';
import { StatisticalCustomerComponent } from './statistical-customer/statistical-customer.component';


export const routes: Routes = [
    {
        path: '', component: StatisticalComponent,
    },
    {
      path: 'staff', component: StatisticalStaffComponent,
    },
    {
      path: 'customer', component: StatisticalCustomerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StatisticalRoutingModule { }
