import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { BranchForEdit } from 'src/app/models/branch/branchForEdit.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html'
})
export class EditBranchComponent implements OnInit {

  editBranchForm: FormGroup;
  branch: BranchForEdit;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private branchService: BranchService,
    private toastr: ToastrService
  ) {
    this.editBranchForm = this.fb.group({
      description: ['', ValidationService.requireValue],
      phoneNumber: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      address: ['', ValidationService.requireValue],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.branchService.getBranchById(this.id).subscribe(
          result => {
            this.branch = result;
            this.editBranchForm.controls.description.setValue(result.description);
            this.editBranchForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.editBranchForm.controls.address.setValue(result.address);
          },
          () => {
            this.toastr.error('Không tìm thấy chi nhánh này');
          });
      }
    });
  }

  editBranch() {
    this.branch = Object.assign({}, this.editBranchForm.value);

    this.branchService.editBranch(this.id, this.branch).subscribe(
      () => {
        this.router.navigate(['/branches']).then(() => {
          this.toastr.success('Cập nhật chi nhánh thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật chi nhánh không thành công!');
      }
    );
  }

  get f() { return this.editBranchForm.controls; }

}
