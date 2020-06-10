import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PictureRoutingModule } from './picture-routing.module';
import { PictureComponent } from './picture.component';
import { AddPictureComponent } from './add-picture/add-picture.component';
import { EditPictureComponent } from './edit-picture/edit-picture.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PictureRoutingModule,
        NgxPaginationModule,
        LoadingBarRouterModule,
        NgxFileDropModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PictureComponent,
        AddPictureComponent,
        EditPictureComponent
    ]
})
export class PictureModule { }
