import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderProductComponent } from './order-product.component';
import { AddOrderProductComponent } from './add-order-product/add-order-product.component';
import { EditOrderProductComponent } from './edit-order-product/edit-order-product.component';
export const routes: Routes = [
    {
        path: '', component: OrderProductComponent,
    },
    {
        path: 'add', component: AddOrderProductComponent
    },
    {
        path: 'edit/:id', component: EditOrderProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderProductRoutingModule { }
