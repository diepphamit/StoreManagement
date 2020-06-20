import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BranchProductComponent } from './branch-product.component';
import { AddBranchProductComponent } from './add-branch-product/add-branch-product.component';
import { EditBranchProductComponent } from './edit-branch-product/edit-branch-product.component';



export const routes: Routes = [
    {
        path: '', component: BranchProductComponent
    },
    {
        path: 'add', component: AddBranchProductComponent
    },
    {
        path: 'edit/:id', component: EditBranchProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BranchProductRoutingModule {}
