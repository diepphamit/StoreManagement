import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrderRoutingModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        OrderComponent,
        AddOrderComponent,
        EditOrderComponent
    ]
})
export class OrderModule { }
