import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticalService } from 'src/app/services/statistical.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ExportService } from 'src/app/services/export.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-remain-product',
  templateUrl: './remain-product.component.html'
})
export class RemainProductComponent implements OnInit {

  keyword: string;
  itemsAsync: Observable<any[]>;
  itemsBranch: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;
  branchId: any;

  constructor(
    public statisticalService: StatisticalService,
    private loadingBar: LoadingBarService,
    private exportService: ExportService,
    private router: Router,
    private authService: AuthService,
    public branchService: BranchService,
  ) { }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('READ_STATISTICAL')).length === 0) {
      this.router.navigate(['/home']);
    }

    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllBranches();
    this.getAllProductRemains(20, this.page);
  }

  getAllProductRemains(branchId: any, page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.statisticalService.getAllProductRemains(branchId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
          this.loadingBar.stop();
        }),
        map(response => response.items)
      );
  }


  // search() {
  //   this.getAllProductSoles(this.page);
  // }

  // refresh() {
  //   this.keyword = '';
  //   this.getAllProductSoles(this.page);
  // }

  // searchCharacter() {
  //   this.itemsAsync = this.statisticalService.getAllProductSoles(this.keyword, this.page, this.pageSize)
  //     .pipe(
  //       debounceTime(1000),
  //       tap(response => {
  //         this.total = response.total;
  //       }),
  //       map(response => response.items)
  //     );
  // }

  export() {
    this.itemsAsync.subscribe(data => this.exportService.exportExcel(data, 'productremains'));
  }

  getAllBranches() {
    this.itemsBranch = this.branchService.getAllBranches('', 1, 1000)
      .pipe(
        map(response => response.items)
      );
  }

  filterProducts(id: any) {
    this.branchId = id;
    //this.getAllProductByBranchId(id, this.page);
    this.getAllProductRemains(this.branchId, this.page);
  }


}
