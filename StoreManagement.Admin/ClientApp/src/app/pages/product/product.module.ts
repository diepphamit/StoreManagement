import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ControlModule } from 'src/app/helper/control.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
        ControlModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ProductComponent,
        AddProductComponent,
        EditProductComponent
    ]
})
export class ProductModule { }
