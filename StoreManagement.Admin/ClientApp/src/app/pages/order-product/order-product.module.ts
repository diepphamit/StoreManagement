import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ControlModule } from 'src/app/helper/control.module';
import { OrderProductRoutingModule } from './oder-product-routing.module';
import { OrderProductComponent } from './order-product.component';
import { AddOrderProductComponent } from './add-order-product/add-order-product.component';
import { EditOrderProductComponent } from './edit-order-product/edit-order-product.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrderProductRoutingModule,
        ControlModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        OrderProductComponent,
        AddOrderProductComponent,
        EditOrderProductComponent
    ]
})
export class OrderProductModule { }
