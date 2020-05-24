import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BranchComponent } from './branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';



export const routes: Routes = [
    {
        path: '', component: BranchComponent
    },
    {
        path: 'add', component: AddBranchComponent
    },
    {
        path: 'edit/:id', component: EditBranchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BranchRoutingModule { }
