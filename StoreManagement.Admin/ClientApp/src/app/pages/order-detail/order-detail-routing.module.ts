import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail.component';
import { AddOrderDetailComponent } from './add-order-detail/add-order-detail.component';
import { EditOrderDetailComponent } from './edit-order-detail/edit-order-detail.component';


export const routes: Routes = [
    {
        path: '', component: OrderDetailComponent,
    },
    {
        path: 'add', component: AddOrderDetailComponent
    },
    {
        path: 'edit/:id', component: EditOrderDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderDetailRoutingModule { }
