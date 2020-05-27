import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { SupplierForEdit } from 'src/app/models/supplier/supplierForEdit.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html'
})
export class EditSupplierComponent implements OnInit {

  editSupplierForm: FormGroup;
  supplier: SupplierForEdit;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {
    this.editSupplierForm = this.fb.group({
      name: ['', [ValidationService.requireValue]],
      description: ['', [ValidationService.requireValue]],
      phoneNumber: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      address: ['', [ValidationService.requireValue]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.supplierService.getSuppliersById(this.id).subscribe(
          result => {
            this.supplier = result;
            this.editSupplierForm.controls.name.setValue(result.name);
            this.editSupplierForm.controls.description.setValue(result.description);
            this.editSupplierForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.editSupplierForm.controls.address.setValue(result.address);
          },
          () => {
            this.toastr.error('Không tìm thấy nhà cung cấp này');
          });
      }
    });
  }

  editSupplier() {
    this.supplier = Object.assign({}, this.editSupplierForm.value);

    this.supplierService.editSupplier(this.id, this.supplier).subscribe(
      () => {
        this.router.navigate(['/suppliers']).then(() => {
          this.toastr.success('Cập nhật lnhà cung cấp thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật loại hàng không thành công!');
      }
    );
  }

  get f() { return this.editSupplierForm.controls; }
}
