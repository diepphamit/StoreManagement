import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  id: any;
  order: any;
  items: any[];
  itemsAsync: Observable<any[]>;
  branch: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private branchService: BranchService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.itemsAsync = this.orderDetailService.getAllOrderDetails(this.id, '', 1, 1000)
          .pipe(
            map(response => response.items)
          );
        this.getOrderById(this.id);
        this.getOrderDetailByOrderId(this.id);
      }
    });

  }

  getOrderById(id: any) {
    this.orderService.getOrderById(id).subscribe(data => {
      this.order = data;
      this.branchService.getBranchById(data.branchId).subscribe(dataBranch => this.branch = dataBranch);
    });
  }

  getOrderDetailByOrderId(orderId: any) {
    this.orderDetailService.getAllOrderDetails(orderId, '', 1, 1000).subscribe(data => {
      this.items = data.items;
    });
  }

  get totalPrice() {
    if (this.items) {
      return this.items['items'].reduce((acc, val) => acc += (val.price * val.quantity), 0);
    }
    return 0;
  }

}
