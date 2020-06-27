import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductForAdd } from 'src/app/models/products/productForAdd.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.sevice';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  product: ProductForAdd;
  page: number;
  pageSize: number;
  total: number;
  categories: Observable<any[]>;
  suppliers: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.addProductForm = this.fb.group({
      name: ['', [ValidationService.requireValue]],
      description: ['', [ValidationService.requireValue]],
      price: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      discount: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      barcode: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      supplierId: ['', [ValidationService.requireValue]],
      categoryId: ['', [ValidationService.requireValue]]
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('CREATE_PRODUCT')).length === 0) {
      this.router.navigate(['/products']);
    }

    this.page = 1;
    this.pageSize = 1000;
    this.getAllCategories(this.page);
    this.getAllSuppliers(this.page);
  }
  getAllCategories(page: number) {
    this.categories = this.categoryService.getAllCategories('', page, this.pageSize)
    .pipe(
      map(response => response.items)
    );
  }

  getAllSuppliers(page: number) {
    this.suppliers = this.supplierService.getAllSuppliers('', page, this.pageSize)
    .pipe(
      map(response => response.items)
    );
  }

  addProduct() {
    this.product = Object.assign({}, this.addProductForm.value);
    this.product.categoryId = Number(this.product.categoryId);
    this.product.supplierId = Number(this.product.supplierId);
    this.product.price = Number(this.product.price);
    this.product.discount = Number(this.product.discount);
    this.product.barcode = Number(this.product.barcode);
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe(
      () => {
        this.router.navigate(['/products']).then(() => {
          this.toastr.success('Tạo sản phẩm thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Tạo sản phẩm không thành công!');
      }
    );
  }

  get f() { return this.addProductForm.controls; }

}
