import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


export const routes: Routes = [
    {
        path: '', component: CategoryComponent,
    },
    {
        path: 'add', component: AddCategoryComponent
    },
    {
        path: 'edit/:id', component: EditCategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategoryRoutingModule { }
