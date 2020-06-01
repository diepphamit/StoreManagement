import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductForEdit } from 'src/app/models/products/productForEdit.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.sevice';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  editProductForm: FormGroup;
  product: ProductForEdit;
  id: any;
  categories: Observable<any[]>;
  suppliers: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {
    this.editProductForm = this.fb.group({
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
    this.page = 1;
    this.pageSize = 1000;
    this.getAllCategories(this.page);
    this.getAllSuppliers(this.page);

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.productService.getProductById(this.id).subscribe(
          result => {
            this.product = result;
            this.editProductForm.controls.name.setValue(result.name);
            this.editProductForm.controls.description.setValue(result.description);
            this.editProductForm.controls.price.setValue(result.price);
            this.editProductForm.controls.discount.setValue(result.discount);
            this.editProductForm.controls.barcode.setValue(result.barcode);
            this.editProductForm.controls.supplierId.setValue(result.supplierId);
            this.editProductForm.controls.categoryId.setValue(result.categoryId);
          },
          () => {
            this.toastr.error(`Không tìm thấy sản phẩm này`);
          });
      }
    });
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

  editProduct() {
    this.product = Object.assign({}, this.editProductForm.value);
    this.product.categoryId = Number(this.product.categoryId);
    this.product.supplierId = Number(this.product.supplierId);
    this.product.price = Number(this.product.price);
    this.product.discount = Number(this.product.discount);
    this.product.barcode = Number(this.product.barcode);
    console.log(this.product);

    this.productService.editProduct(this.id, this.product).subscribe(
      () => {
        this.router.navigate(['/products']).then(() => {
          this.toastr.success('Cập nhật sản phẩm thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật sản phẩm không thành công!');
      }
    );
  }

  get f() { return this.editProductForm.controls; }
}
