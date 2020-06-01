import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChartdemoComponent } from './chartdemo.component';

export const routes: Routes = [
    {
        path: '', component: ChartdemoComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChartdemoRoutingModule { }
