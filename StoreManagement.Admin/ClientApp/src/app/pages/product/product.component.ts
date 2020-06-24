import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/products/product.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.sevice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, map, debounceTime } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/services/auth.service';
import { CURRENT_USER } from 'src/app/constants/db-keys';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  permissons: string[];
  canDelete = false;
  canUpdate = false;
  canCreate = false;

  constructor(
    public productService: ProductService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.loadPermisson();
    this.getAllProducts(this.page);
  }

  getAllProducts(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.productService.getAllProducts(this.keyword, page, this.pageSize)
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
    this.router.navigate(['/products/add']);
  }

  edit(id: any) {
    this.router.navigate(['/products/edit/' + id]);
  }

  // editFull(id: any) {
  //     this.router.navigate(['/users/editfull/' + id]);
  // }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.product = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.product) {
      this.productService.deleteProduct(this.product.id)
        .subscribe(
          () => {
            this.getAllProducts(this.page);
            this.toastr.success(`Xóa sản phẩm thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(`Xóa sản phẩm không thành công!`);
          }
        );
    }
    this.product = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.product = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllProducts(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllProducts(this.page);
  }

  searchCharacter() {
    this.itemsAsync = this.productService.getAllProducts(this.keyword, this.page, this.pageSize)
        .pipe(
            debounceTime(1000),
            tap(response => {
                this.total = response.total;
            }),
            map(response => response.items)
        );
  }

  loadPermisson() {
    this.permissons = this.authService.getRoles().filter(x => x.includes('PRODUCT'));

    if (this.permissons.filter(x => x.includes('DELETE')).length === 0) {
      this.canDelete = true;
    }

    if (this.permissons.filter(x => x.includes('UPDATE')).length === 0) {
      this.canUpdate = true;
    }

    if (this.permissons.filter(x => x.includes('CREATE')).length === 0) {
      this.canCreate = true;
    }
  }

}
