import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BranchRoutingModule,
        ControlModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        BranchComponent,
        AddBranchComponent,
        EditBranchComponent
    ]
})
export class BranchModule { }
