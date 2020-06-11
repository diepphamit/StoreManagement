import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { OrderService } from 'src/app/services/order.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chartdemo',
  templateUrl: './chartdemo.component.html'
})
export class ChartdemoComponent implements OnInit {

  dateForm: FormGroup;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [];

  public barChartLabels1 = [];
  public barChartData1 = [];

  public barChartLabels2 = [];
  public barChartData2 = [];

  maxDate: Date;
  datePre: Date;
  dateAfter: Date;

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.maxDate = new Date();
    this.dateForm = this.fb.group({
      datePre: ['', Validators.required],
      dateAfter: ['', Validators.required],
    });
  }

  bsValue: Date = new Date(2017, 7);
  minMode: BsDatepickerViewMode = 'month'; // change for month:year

  bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY'
    });

    //this.drawChartByDate(new Date(Date.now()));

  }

  drawChart() {
    const date = new Date(this.dateForm.value.datePre);
    const dateCompare = new Date(this.dateForm.value.dateAfter);
    this.orderService.getRevenue(date).subscribe(data => {
      const items: any[] = data['revenues'];

      const data1 = [];

      for (let i = 1; i <= items.length; i++) {
        this.barChartLabels1[i - 1] = '' + i;
        data1[i - 1] = items[i - 1]['totalRevenue'];
      }
      this.barChartData1 = [{ data: data1, label: 'Tháng ' +  date.getDay()}];

    });

    this.orderService.getRevenue(dateCompare).subscribe(data => {
      const items: any[] = data['revenues'];

      const data1 = [];

      for (let i = 1; i <= items.length; i++) {
        this.barChartLabels2[i - 1] = '' + i;
        data1[i - 1] = items[i - 1]['totalRevenue'];
      }
      this.barChartData2 = [{ data: data1, label: 'Tháng ' +  date.getDay()}];

    });
  }
  get f() { return this.dateForm.controls; }

  drawChartByDate(date: Date) {
    this.orderService.getRevenue(date).subscribe(data => {
      if (data != null) {
        const items: any[] = data['revenues'];

      const data1 = [];

      for (let i = 1; i <= items.length; i++) {
        this.barChartLabels1[i - 1] = '' + i;
        data1[i - 1] = items[i - 1]['totalRevenue'];
      }
      console.log(data1);
      this.barChartData1 = [{ data: data1, label: 'Tháng ' +  date.getDay()}];
      }
    });
  }

}
