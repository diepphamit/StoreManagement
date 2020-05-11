import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierForList } from 'src/app/models/supplier/supplier.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplierForEdit } from 'src/app/models/supplier/supplierForEdit.model';

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
      name: ['', Validators.required],
      description: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
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
            this.editSupplierForm.controls.phonenumber.setValue(result.phonenumber);
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
          this.toastr.success('Cập nhật nhà cung cấp thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật nhà cung cấp không thành công!');
      }
    );
  }

  get f() { return this.editSupplierForm.controls; }

}
