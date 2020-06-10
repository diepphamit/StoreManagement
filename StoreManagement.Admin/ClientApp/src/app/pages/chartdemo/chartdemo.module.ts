import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartdemoRoutingModule } from './chartdemo-routing.module';
import { ChartsModule } from 'ng2-charts';
import { ChartdemoComponent } from './chartdemo.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartdemoRoutingModule,
        ChartsModule,
        LoadingBarRouterModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
      ChartdemoComponent
    ]
})
export class ChartdemoModule { }
