import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ProductService } from 'src/app/services/product.sevice';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UserForList } from 'src/app/models/user/user.model';
import { OrderAdd, ProductOrder } from 'src/app/models/order/orderAdd.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CURRENT_USER } from 'src/app/constants/db-keys';

@Component({
  selector: 'app-add-order-product',
  templateUrl: './add-order-product.component.html'
})
export class AddOrderProductComponent implements OnInit {
  itemsAsync: any = [];

  itemsProduct: Observable<any[]>;
  itemsUser: Observable<any[]>;
  itemCustomer: any = [];
  itemStaff: any[];
  page: number;
  pageSize: number;
  total: number;
  status: any = [
    { value: true, name: 'Da duyet' },
    { value: false, name: 'Chua duyet' }
  ];
  addProductForm: FormGroup;
  addOrderForm: FormGroup;

  orderAdd: OrderAdd;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private productService: ProductService) {
    this.addProductForm = this.fb.group({
      productId: ['', [ValidationService.requireValue]],
      quantity: ['', [ValidationService.requireValue, ValidationService.numberValidator]]
    });
    this.addOrderForm = this.fb.group({
      customerId: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      status: ['', [ValidationService.requireValue]],
      code: ['', [ValidationService.requireValue, ValidationService.numberValidator]]
    });
  }
  ngOnInit() {
    this.page = 1;
    this.pageSize = 1000;
    this.getAllUsers();
    this.getAllProducts(this.page);
  }

  getAllProducts(page: number) {
    this.itemsProduct = this.productService.getAllProducts('', page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  OK() {
    this.productService.getProductById(Number(this.addProductForm.value.productId)).subscribe(data => {
      const x = {
        productId: Number(this.addProductForm.value.productId),
        quantity: Number(this.addProductForm.value.quantity),
        price: Number(data.price),
        name: data.name,
        totalPrice: Number(this.addProductForm.value.quantity) * data.price
      };
      if (this.isPushItem(x.productId, x.quantity) === true) {
        this.itemsAsync.push(x);
      }
    });
  }

  addOrder() {
    // this.orderAdd = Object.assign(Object.assign({}, this.addOrderForm.value), this.itemsAsync);

    this.orderAdd = new OrderAdd(this.getId(), Number(this.addOrderForm.value.customerId),
      Boolean(this.addOrderForm.value.status), Number(this.addOrderForm.value.code), this.itemsAsync as ProductOrder[]);
    console.log(this.orderAdd);

  }

  get totalprice() {
    let prices = 0;
    this.itemsAsync.forEach(element => {
      prices = prices + element.totalPrice;
    });
    return prices;
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

  getAllUsers() {
    this.itemsUser = this.userService.getAllUsers('');
    this.itemsUser.subscribe(data => {
      data.forEach(element => {
        if (element.groupRole === 'Customer') {
          this.itemCustomer.push(element);
        }

      });
    });
  }

  get fProduct() { return this.addProductForm.controls; }
  get fOrder() { return this.addOrderForm.controls; }

  getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

  deleteProduct(id: number) {
    this.itemsAsync = this.itemsAsync.filter(item => item.productId !== id);
  }

}
