import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SupplierComponent } from './supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';

export const routes: Routes = [
    {
        path: '', component: SupplierComponent,
    },
    {
        path: 'add', component: AddSupplierComponent
    },
    {
        path: 'edit/:id', component: EditSupplierComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupplierRoutingModule { }
