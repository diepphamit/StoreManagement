import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticalService } from 'src/app/services/statistical.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ExportService } from 'src/app/services/export.service';
import { tap, map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistical-staff',
  templateUrl: './statistical-staff.component.html'
})
export class StatisticalStaffComponent implements OnInit {

  keyword: string;
  itemsAsync: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;

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
    this.getAllStaffs(this.page);
  }

  getAllStaffs(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.statisticalService.getAllStaffs(this.keyword, page, this.pageSize)
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
    this.getAllStaffs(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllStaffs(this.page);
  }

  searchCharacter() {
    this.itemsAsync = this.statisticalService.getAllStaffs(this.keyword, this.page, this.pageSize)
      .pipe(
        debounceTime(1000),
        tap(response => {
          this.total = response.total;
        }),
        map(response => response.items)
      );
  }

  export() {
    this.itemsAsync.subscribe(data => this.exportService.exportExcel(data, 'staffs'));
  }

  selectStatistical(value: any) {
    this.router.navigate(['/statistical/' + value]);
  }

}
