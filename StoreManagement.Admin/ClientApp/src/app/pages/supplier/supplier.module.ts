import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './supplier-routing.module';
import { EditSupplierComponent} from './edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SupplierRoutingModule,
        ControlModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        SupplierComponent,
        EditSupplierComponent,
        AddSupplierComponent
    ]
})
export class SupplierModule { }
