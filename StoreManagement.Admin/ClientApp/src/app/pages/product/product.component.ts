import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/products/product.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.sevice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    public productService: ProductService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.getAllProducts();
  }

  getAllProducts() {
    this.itemsAsync = this.productService.getAllProducts(this.keyword);
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
            this.getAllProducts();
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
    this.getAllProducts();
  }

  refresh() {
    this.keyword = '';
    this.getAllProducts();
  }

}
