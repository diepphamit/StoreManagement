import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlMessagesComponent } from 'src/app/helper/control-messages.component';
import { AppModule } from 'src/app/app.module';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UsersManagementRoutingModule,
        ControlModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        UsersManagementComponent,
        AddUserComponent,
        EditUserComponent
    ]
})
export class UsersManagementModule { }
