import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BranchProductRoutingModule } from './branch-product-routing.module';
import { BranchProductComponent } from './branch-product.component';
import { AddBranchProductComponent } from './add-branch-product/add-branch-product.component';
import { EditBranchProductComponent } from './edit-branch-product/edit-branch-product.component';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BranchProductRoutingModule,
        ControlModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        BranchProductComponent,
        AddBranchProductComponent,
        EditBranchProductComponent
    ]
})
export class BranchProductModule { }
