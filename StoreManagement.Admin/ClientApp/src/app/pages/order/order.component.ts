import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/models/order/order.model';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  order: Order;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public orderService: OrderService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllOrders(this.page);
  }

  getAllOrders(page: number) {
    this.itemsAsync = this.orderService.getAllOrders(this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  add() {
    this.router.navigate(['/orders/add']);
  }

  edit(id: any) {
    this.router.navigate(['/orders/edit/' + id]);
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
