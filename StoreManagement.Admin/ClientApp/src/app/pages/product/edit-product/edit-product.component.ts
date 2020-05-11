import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductForEdit } from 'src/app/models/products/productForEdit.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.sevice';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      barcode: ['', Validators.required],
      supplierId: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories('');

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
          this.toastr.success('Cập nhật khóa học thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật sản phẩm không thành công!');
      }
    );
  }

  get f() { return this.editProductForm.controls; }
}
