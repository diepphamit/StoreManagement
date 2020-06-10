import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderProduct } from 'src/app/models/order/orderProduct.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html'
})
export class OrderProductComponent implements OnInit {

  order: OrderProduct;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public orderService: OrderService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllOrders(this.page);
  }

  getAllOrders(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.orderService.getAllOrders(this.keyword, page, this.pageSize)
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
    this.router.navigate(['/orderproducts/add']);
  }

  edit(id: any) {
    this.router.navigate(['/orderproducts/edit/' + id]);
  }

  // editFull(id: any) {
  //     this.router.navigate(['/users/editfull/' + id]);
  // }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.order = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.order) {
      this.orderService.deleteOrder(this.order.id)
        .subscribe(
          () => {
            this.getAllOrders(this.page);
            this.toastr.success(`Xóa đơn hàng thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(('Xóa đơn hàng không thành công'));
          }
        );
    }
    this.order = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.order = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllOrders(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllOrders(this.page);
  }

}