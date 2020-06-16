import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
export const routes: Routes = [
    {
        path: '', component: ProductComponent,
    },
    {
        path: 'add', component: AddProductComponent
    },
    {
        path: 'edit/:id', component: EditProductComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductRoutingModule { }
