import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.sevice';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { tap, map } from 'rxjs/operators';
import { BranchProductForAdd } from 'src/app/models/branch-product/branch-productForAdd.model';
import { BranchService } from 'src/app/services/branch.service';
import { BranchProductService } from 'src/app/services/branch-product.service';

@Component({
  selector: 'app-add-branch-product',
  templateUrl: './add-branch-product.component.html'
})
export class AddBranchProductComponent implements OnInit {

  addBranchProductForm: FormGroup;
  branchProduct: BranchProductForAdd;
  page: number;
  pageSize: number;
  total: number;
  branches: Observable<any[]>;
  products: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private branchService: BranchService,
    private branchProductService: BranchProductService,
    private toastr: ToastrService
  ) {
    this.addBranchProductForm = this.fb.group({
      brachId: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      productId: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      quantity: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
    });
  }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 1000;
    this.getAllBranches(this.page);
    this.getAllProducts(this.page);
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

  addBranchProduct() {
    this.branchProduct = Object.assign({}, this.addBranchProductForm.value);
    this.branchProduct.quantity = Number(this.branchProduct.quantity);
    this.branchProduct.productId = Number(this.branchProduct.productId);
    this.branchProduct.brachId = Number(this.branchProduct.brachId);
    console.log(this.branchProduct);

    this.branchProductService.createBranchProduct(this.branchProduct).subscribe(
      () => {
          this.router.navigate(['/branchproducts']).then(() => {
          this.toastr.success('Tạo sản phẩm thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Tạo sản phẩm không thành công!');
      }
    );
  }

  get f() { return this.addBranchProductForm.controls; }

}
