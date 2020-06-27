import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.sevice';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { tap, map } from 'rxjs/operators';
import { BranchProductForEdit } from 'src/app/models/branch-product/branch-productForEdit.model';
import { BranchService } from 'src/app/services/branch.service';
import { BranchProductService } from 'src/app/services/branch-product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-branch-product',
  templateUrl: './edit-branch-product.component.html'
})
export class EditBranchProductComponent implements OnInit {

  editBranchProductForm: FormGroup;
  branchProduct: BranchProductForEdit;
  id: any;
  branches: Observable<any[]>;
  products: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private branchService: BranchService,
    private productService: ProductService,
    private branchProductService: BranchProductService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.editBranchProductForm = this.fb.group({
      brachId: ['', [ValidationService.requireValue]],
      productId: ['', [ValidationService.requireValue]],
      quantity: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('UPDATE_BRANCH')).length === 0) {
      this.router.navigate(['/branchproducts']);
    }

    this.page = 1;
    this.pageSize = 1000;
    this.getAllProducts(this.page);
    this.getAllBranches(this.page);

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.branchProductService.getBranchProductById(this.id).subscribe(
          result => {
            this.branchProduct = result;
            this.editBranchProductForm.controls.quantity.setValue(result.quantity);
            this.editBranchProductForm.controls.brachId.setValue(result.brachId);
            this.editBranchProductForm.controls.productId.setValue(result.productId);
            console.log(result);
          },
          () => {
            this.toastr.error(`Không tìm thấy sản phẩm này`);
          });
      }
    });
  }

  getAllBranches(page: number) {
    this.branches = this.branchService.getAllBranches('', page, this.pageSize)
      .pipe(
        map(response => response.items)
      );
  }

  getAllProducts(page: number) {
    this.products = this.productService.getAllProducts('', page, this.pageSize)
      .pipe(
        map(response => response.items)
      );
  }

  editBranhcProduct() {
    this.branchProduct = Object.assign({}, this.editBranchProductForm.value);
    this.branchProduct.quantity = Number(this.branchProduct.quantity);
    this.branchProduct.brachId = Number(this.branchProduct.brachId);
    this.branchProduct.productId = Number(this.branchProduct.productId);

    this.branchProductService.editBranchProduct(this.id, this.branchProduct).subscribe(
      () => {
        this.router.navigate(['/branchproducts']).then(() => {
          this.toastr.success('Cập nhật sản phẩm thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật sản phẩm không thành công!');
      }
    );
  }

  get f() { return this.editBranchProductForm.controls; }
}
