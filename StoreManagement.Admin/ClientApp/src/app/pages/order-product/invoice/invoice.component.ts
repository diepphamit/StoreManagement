import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements  OnInit {

  id: any;
  order: any;
  items: any[];
  itemsAsync: Observable<any[]>;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService) { }
    ngOnInit() {
    //console.log( this.route.params._value.id);
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.itemsAsync = this.orderDetailService.getAllOrderDetails(this.id, '', 1, 1000)
      .pipe(
        map(response => response.items)
      );
        this.getOrderById(this.id);
        this.getOrderDetailByOrderId(this.id);
        //setTimeout( () => console.log(this.items), 2000 );
        console.log(this.items);
      }
    });

  }

  getOrderById(id: any) {
    this.orderService.getOrderById(id).subscribe(data => this.order = data);
  }

  getOrderDetailByOrderId(orderId: any) {
    this.orderDetailService.getAllOrderDetails(orderId, '', 1, 1000).subscribe(data => {
      this.items = data;
      console.log(this.id);
      console.log(this.items);
      //window.print();
    });
  }
  flag = false;
  print() {
    this.flag = true;
    window.print();
  }

}
