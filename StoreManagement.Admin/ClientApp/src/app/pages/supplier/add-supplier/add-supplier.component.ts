import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from 'src/app/models/supplier/supplier.model';
import { SupplierForAdd } from 'src/app/models/supplier/supplierForAdd.model';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html'
})
export class AddSupplierComponent implements OnInit {

  addSupplierForm: FormGroup;
  supplier: SupplierForAdd;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {
    this.addSupplierForm = this.fb.group({
      name: ['', [ValidationService.requireValue]],
      description: ['', [ValidationService.requireValue]],
      phoneNumber: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      address: ['', [ValidationService.requireValue]]
    });
  }

  ngOnInit() {
  }

  addSupplier() {
    this.supplier = Object.assign({}, this.addSupplierForm.value);

    this.supplierService.createSupplier(this.supplier).subscribe(
      () => {
        this.router.navigate(['/suppliers']).then(() => {
          this.toastr.success('Thêm nhà cung cấp thành công');
        });
      },
      (error: HttpErrorResponse) =>
        this.toastr.error('Thêm nhà cung cấp không thành công!')
      );
  }

  get f() { return this.addSupplierForm.controls; }
}
