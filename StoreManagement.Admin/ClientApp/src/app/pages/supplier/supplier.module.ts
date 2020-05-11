import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './supplier-routing.module';
import { EditSupplierComponent} from './edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SupplierRoutingModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        SupplierComponent,
        EditSupplierComponent,
        AddSupplierComponent
    ]
})
export class SupplierModule { }
