import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderForAdd } from 'src/app/models/order/orderForAdd.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html'
})
export class AddOrderComponent implements OnInit {

  addOrderForm: FormGroup;
  order: OrderForAdd;

  users: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.addOrderForm = this.fb.group({
      customerId: ['', Validators.required],
      staffId: ['', Validators.required],
      orderDate: ['', Validators.required],
      code: ['', Validators.required],
      totalPrice: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.users = this.userService.getAllUsers('');
  }
  addOrder() {
    this.order = Object.assign({}, this.addOrderForm.value);
    this.order.customerId = Number(this.order.customerId);
    this.order.staffId = Number(this.order.staffId);
    this.order.orderDate = this.order.orderDate;
    this.order.code = this.order.code;
    this.order.totalprice = Number(this.order.totalprice);

    this.orderService.createOrder(this.order).subscribe(
      () => {
        this.router.navigate(['/orders']).then(() => {
          this.toastr.success('Tạo đơn hàng thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Tạo đơn hàng không thành công!');
      }
    );
  }

  get f() { return this.addOrderForm.controls; }

}
