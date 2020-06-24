import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticalService } from 'src/app/services/statistical.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ExportService } from 'src/app/services/export.service';
import { tap, map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-statistical-customer',
  templateUrl: './statistical-customer.component.html'
})
export class StatisticalCustomerComponent implements OnInit {

  keyword: string;
  itemsAsync: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public statisticalService: StatisticalService,
    private loadingBar: LoadingBarService,
    private exportService: ExportService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('READ_STATISTICAL')).length === 0) {
      this.router.navigate(['/home']);
    }

    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllCustomers(this.page);
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
}
