import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';


export const routes: Routes = [
    {
        path: '', component: OrderComponent,
    },
    {
        path: 'add', component: AddOrderComponent
    },
    {
        path: 'edit/:id', component: EditOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule { }
