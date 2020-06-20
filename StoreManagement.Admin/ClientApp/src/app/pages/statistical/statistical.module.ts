import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ControlModule } from 'src/app/helper/control.module';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalComponent } from './statistical.component';
import { StatisticalStaffComponent } from './statistical-staff/statistical-staff.component';
import { StatisticalCustomerComponent } from './statistical-customer/statistical-customer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StatisticalRoutingModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        ControlModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        StatisticalComponent,
        StatisticalStaffComponent,
        StatisticalCustomerComponent
    ]
})
export class StatisticalModule { }
