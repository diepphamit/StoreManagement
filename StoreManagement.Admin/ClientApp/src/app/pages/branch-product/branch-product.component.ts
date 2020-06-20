import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BranchProduct } from 'src/app/models/branch-product/branch-product.model';
import { BranchProductService } from 'src/app/services/branch-product.service';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.sevice';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-branch-product',
  templateUrl: './branch-product.component.html'
})
export class BranchProductComponent implements OnInit {

  branchProduct: BranchProduct;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  brachId: any;
  total: number;
  itemsProduct: Observable<any[]>;
  itemsBranch: Observable<any[]>;
  item: Array<object[]>;

  constructor(
    public productService: ProductService,
    public branchService: BranchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService,
    private branchProductService: BranchProductService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllBranches();
    this.getBranches();
  }

  getBranches() {
    this.branchService.getAllBranches('', 1, 1000).subscribe(
      result => {
        this.item = result;
        this.brachId = result.items[0].id;
        // console.log(result);
        this.getAllProductByBranchId(result.items[0].id, 1);
      },
      () => {
        this.toastr.error(`Không tìm thấy sản phẩm này`);
      });
  }


  getAllBranchProducts(id: any, page: number) {
    this.loadingBar.start();
    this.brachId = id;
    this.itemsAsync = this.branchProductService.getAllBranchProducts(this.brachId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
          this.loadingBar.stop();
        }),
        map(response => response.items)
      );
  }


  getAllProductByBranchId(id: any, page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.branchProductService.getAllBranchesById(id, '', page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
          this.loadingBar.stop();
        }),
        map(response => response.items)
      );
  }




  add() {
    this.router.navigate(['/branchproducts/add']);
  }

  edit(id: any) {
    this.router.navigate(['/branchproducts/edit/' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.branchProduct = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.branchProduct) {
      this.branchProductService.deleteBranchProduct(this.branchProduct.id)
        .subscribe(
          () =>  {
            this.getAllProductByBranchId(this.brachId, this.page);
            this.toastr.success(`Xóa sản phẩm thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(`Xóa sản phẩm không thành công!`);
          }
        );
    }
    this.branchProduct = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.branchProduct = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllBranchProducts(this.itemsBranch, this.page);
  }

  // refresh() {
  //   this.keyword = '';
  //   this.getAllBranchProducts(this.itemsBranch, this.page);
  // }

  getAllBranches() {
    this.itemsBranch = this.branchService.getAllBranches('', 1, 1000)
      .pipe(
        map(response => response.items)
      );
  }

  getAllProducts() {
    this.itemsProduct = this.productService.getAllProducts('', 1, 1000)
      .pipe(
        map(response => response.items)
      );
  }

  filterProducts(id: any) {
      this.brachId = id;
      this.getAllProductByBranchId(id, this.page);
  }

}
