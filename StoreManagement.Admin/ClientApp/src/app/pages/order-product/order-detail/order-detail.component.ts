import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ProductService } from 'src/app/services/product.sevice';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {

  orderDetail: any;
  keyword: string;
  itemsAsync: any[];
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  id: any;
  addProductForm: FormGroup;
  itemsProduct: Observable<any[]>;
  itemDeletes: any[] = [];
  totalPrices = 0;

  constructor(
    public orderDetailService: OrderDetailService,
    private router: Router,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.addProductForm = this.fb.group({
      productId: ['', [Validators.required]],
      quantity: ['', [Validators.required, ValidationService.numberValidator]]
    });
  }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllOrderDetail(this.page);
  }

  getAllOrderDetail(page: number) {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.orderService.getOrderById(this.id).subscribe(data => {
          this.getAllProducts(data.branchId, this.page);
        });
        this.orderDetailService.getAllOrderDetails(this.id, '', page, this.pageSize).subscribe(data => {
          this.itemsAsync = data.items;
        });
      }
    });
  }

  close(): void {
    this.orderDetail = undefined;
    this.modalRef.hide();
  }

  addProduct() {
    this.productService.getProductById(Number(this.addProductForm.value.productId)).subscribe(data => {
      const x = {
        productId: Number(this.addProductForm.value.productId),
        quantity: Number(this.addProductForm.value.quantity),
        price: Number(data.price),
        productName: data.name,
        totalPrice: Number(this.addProductForm.value.quantity) * data.price
      };
      if (this.isPushItem(x.productId, x.quantity) === true) {
        this.itemsAsync.push(x);
      }
    });
  }

  getAllProducts(branchId: any, page: number) {
    this.itemsProduct = this.productService.getAllProductsByBranchId(branchId, '', page, this.pageSize)
      .pipe(
        map(response => response.items)
      );
  }

  isPushItem(productId, quantity) {
    let isPush = true;
    this.itemsAsync.forEach(element => {
      if (element.productId === productId) {
        element.quantity = element.quantity + quantity;
        element.totalPrice = element.quantity * element.price;
        isPush = false;
      }
    });

    return isPush;
  }

  deleteProduct(item: any) {
    this.itemDeletes.push(item);
    this.itemsAsync = this.itemsAsync.filter(x => x.productId !== item.productId);
  }

  confirm() {
    const order = {
      id: Number(this.id),
      items: this.itemsAsync,
      itemDeletes: this.itemDeletes
    };

    this.loadingBar.start();
    this.orderDetailService.editOrderDetail(this.id, order).subscribe(
      () => {
        this.router.navigate(['/orderproducts']).then(() => {
          this.toastr.success('Tạo đơn hàng thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Tạo đơn hàng không thành công!');
        this.loadingBar.stop();
      }
    );
  }

  // getAllProducts(branchId: any) {
  //   this.products = this.productService.GetAllProductNotInBranch(branchId);
  // }
  get totalPrice() {
    if (this.itemsAsync) {
      return this.itemsAsync.reduce((acc, val) => acc += (val.price * val.quantity), 0);
    }
    return 0;
  }
}
