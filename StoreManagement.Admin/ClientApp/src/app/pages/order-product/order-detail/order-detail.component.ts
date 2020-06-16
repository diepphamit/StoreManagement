import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {

  orderDetail: any;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  id: any;

  constructor(
    public orderDetailService: OrderDetailService,
    private router: Router,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllOrderDetail(this.page);
  }

  getAllOrderDetail(page: number) {
    this.loadingBar.start();

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.itemsAsync = this.orderDetailService.getAllOrderDetails(this.id, '', page, this.pageSize)
          .pipe(
            tap(response => {
              this.total = response.total;
              this.page = page;
              this.loadingBar.stop();
            }),
            map(response => response.items)
          );
      }
    });
  }

  add() {
    this.router.navigate(['/suppliers/add']);
  }

  edit(id: any) {
    this.router.navigate(['/suppliers/edit/' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.orderDetail = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.orderDetail) {
      this.orderDetailService.deleteOrderDetail(this.orderDetail.id)
        .subscribe(
          () => {
            this.getAllOrderDetail(this.page);
            this.toastr.success(`Xóa sản phẩm thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(('Xóa sản phẩm không thành công'));
          }
        );
    }
    this.orderDetail = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.orderDetail = undefined;
    this.modalRef.hide();
  }

}
