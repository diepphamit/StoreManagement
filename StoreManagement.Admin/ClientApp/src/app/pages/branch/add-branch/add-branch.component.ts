import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation.service';
import { BranchForAdd } from 'src/app/models/branch/branchForAdd.model';
import { BranchService } from 'src/app/services/branch.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html'
})
export class AddBranchComponent implements OnInit {

  addBranchForm: FormGroup;
  branch: BranchForAdd;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.addBranchForm = this.fb.group({
      description: ['', ValidationService.requireValue],
      phonenumber: ['', [ValidationService.requireValue, ValidationService.numberValidator]],
      address: ['', [ValidationService.requireValue]]
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('CREATE_BRANCH')).length === 0) {
      this.router.navigate(['/branchs']);
    }
  }

  addBranch() {
    this.branch = Object.assign({}, this.addBranchForm.value);
    this.branchService.createBranch(this.branch).subscribe(
      () => {
        this.router.navigate(['/branches']).then(() => {
          this.toastr.success('Tạo nhà chi nhánh thành công');
        });
      },
      (error: HttpErrorResponse) =>
        this.toastr.error('Tạo nhà chi nhánh không thành công!')
      );
  }

  get f() { return this.addBranchForm.controls; }
}
