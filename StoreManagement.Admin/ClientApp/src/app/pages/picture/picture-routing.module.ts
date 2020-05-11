import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PictureComponent } from './picture.component';
import { AddPictureComponent } from './add-picture/add-picture.component';
import { EditPictureComponent } from './edit-picture/edit-picture.component';

export const routes: Routes = [
    {
        path: '', component: PictureComponent,
    },
    {
        path: 'add', component: AddPictureComponent
    },
    {
        path: 'edit/:id', component: EditPictureComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PictureRoutingModule { }
