import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersManagementComponent } from './users-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
    {
        path: '', component: UsersManagementComponent,
    },
    {
        path: 'add', component: AddUserComponent
    },
    {
        path: 'edit/:id', component: EditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersManagementRoutingModule { }
