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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
        ControlModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ProductComponent,
        AddProductComponent,
        EditProductComponent
    ]
})
export class ProductModule { }
