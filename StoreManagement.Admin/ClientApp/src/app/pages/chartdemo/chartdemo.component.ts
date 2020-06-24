import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { OrderService } from 'src/app/services/order.service';
import { formatDate } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chartdemo',
  templateUrl: './chartdemo.component.html'
})
export class ChartdemoComponent implements OnInit {

  dateForm: FormGroup;
  checkData = false;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [];


  maxDate: Date;
  datePre: Date;
  dateAfter: Date;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private loadingBar: LoadingBarService,
    private authService: AuthService,
    private router: Router) {
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
    if (this.authService.getRoles().filter(x => x.includes('READ_STATISTICAL')).length === 0) {
      this.router.navigate(['/home']);
    }

    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY'
    });
    for (let i = 1; i <= 31; i++) {
      this.barChartLabels[i - 1] = '' + i;
    }
    this.drawChartByDate(new Date(Date.now()));
  }

  drawChart() {
    const date = new Date(this.dateForm.value.datePre);
    const dateCompare = new Date(this.dateForm.value.dateAfter);
    this.barChartData = [];
    this.loadingBar.start();
    this.orderService.getRevenue(date).subscribe(data => {
      const items: any[] = data['revenues'];

      const dataChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 1; i <= items.length; i++) {

        dataChart[i - 1] = items[i - 1]['totalRevenue'];
      }
      this.barChartData = [{ data: dataChart, label: 'Tháng ' + (date.getMonth() + 1) }];

      this.orderService.getRevenue(dateCompare).subscribe(data1 => {
        const items1: any[] = data1['revenues'];

        const dataChart1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 1; i <= items1.length; i++) {

          dataChart1[i - 1] = items1[i - 1]['totalRevenue'];
        }
        this.barChartData.push({ data: dataChart1, label: 'Tháng ' + (dateCompare.getMonth() + 1) });
        this.loadingBar.stop();
      });

    });


  }
  get f() { return this.dateForm.controls; }

  drawChartByDate(date: Date) {
    this.loadingBar.start();
    this.orderService.getRevenue(date).subscribe(data => {
      if (data != null) {
        const items: any[] = data['revenues'];

        const data1 = [];

        for (let i = 1; i <= items.length; i++) {
          this.barChartLabels[i - 1] = '' + i;
          data1[i - 1] = items[i - 1]['totalRevenue'];
        }

        this.barChartData = [{ data: data1, label: 'Tháng ' + (date.getMonth() + 1) }];
        this.checkData = true;
        this.loadingBar.stop();
      }
    });
  }

}
