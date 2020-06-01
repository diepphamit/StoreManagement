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

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public barChartLabels1 = [];
  public barChartData1 = [];
  //public data1 = [];
  data: any[] = [
    { key: 1, value: '1' },
    { key: 2, value: '2' },
    { key: 3, value: '3' }
  ];
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
    const data1 = [];
    for (let i = 1; i <= new Date(2020, 2, 0).getDate() + 1; i++) {
      this.barChartLabels1[i - 1] = '' + i;
      data1[i - 1] = 50 - i;
    }
    this.barChartData1 = [{ data: data1, label: 'Diep' }];

  }

  drawChart() {
    const date = new Date(this.dateForm.value.datePre);
    this.orderService.getRevenue(date).subscribe(data => {
      console.log(data);
      //items = JSON.parse(data);

      const items: any[] = data['revenues'];

      const data1 = [];

      for (let i = 1; i <= items.length; i++) {
        this.barChartLabels1[i - 1] = '' + i;
        data1[i - 1] = items[i - 1]['totalRevenue'];
        console.log(items[i - 1]['totalRevenue']);
      }
      this.barChartData1 = [{ data: data1, label: 'Diep' }];

    });

    //console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
    // const data1 = [];

    // for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
    //   this.barChartLabels1[i - 1] = '' + i;
    //   data1[i - 1] = 50 - i;
    // }
    // this.barChartData1 = [{ data: data1, label: 'Diep' }];
    //console.log(this.barChartData1);

  }
  get f() { return this.dateForm.controls; }

}
