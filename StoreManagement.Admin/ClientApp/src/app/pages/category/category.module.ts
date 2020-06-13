import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ControlModule } from 'src/app/helper/control.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        ControlModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        CategoryComponent,
        AddCategoryComponent,
        EditCategoryComponent
    ]
})
export class CategoryModule { }
