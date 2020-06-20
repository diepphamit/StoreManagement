import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticalService } from 'src/app/services/statistical.service';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { tap, map, debounceTime } from 'rxjs/operators';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html'
})
export class StatisticalComponent implements OnInit {
  keyword: string;
  itemsAsync: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;
  flag = 1;

  constructor(
    public statisticalService: StatisticalService,
    private loadingBar: LoadingBarService,
    private exportService: ExportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    //this.getAllCustomers(this.page);
  }

  getAllCustomers(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.statisticalService.getAllCustomers(this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
          this.loadingBar.stop();
        }),
        map(response => response.items)
      );
  }


  search() {
    this.getAllCustomers(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllCustomers(this.page);
  }

  searchCharacter() {
    this.itemsAsync = this.statisticalService.getAllCustomers(this.keyword, this.page, this.pageSize)
      .pipe(
        debounceTime(1000),
        tap(response => {
          this.total = response.total;
        }),
        map(response => response.items)
      );
  }

  export() {
    this.itemsAsync.subscribe(data => this.exportService.exportExcel(data, 'customers'));
  }

  selectStatistical(value: any) {
    // console.log('abc');
    // this.router.navigate(['/statistical/' + value]);
    this.flag = value;
  }

}
