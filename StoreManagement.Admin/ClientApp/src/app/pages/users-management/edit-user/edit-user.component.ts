import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  user: UserUpdate;
  id: any;
  groupUser: Observable<any[]>;
  roles1: any[] = [
    { key: 1, value: ['Admin'] },
    { key: 2, value: ['Staff'] },
    { key: 3, value: ['Customer'] }
  ];
  genders: any[] = [
    { key: false, value: ['Nữ'] },
    { key: true, value: ['Nam'] }
  ];



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.editUserForm = this.fb.group({
      email: ['', [ValidationService.emailValidator]],
      name: [''],
      address: [''],
      phoneNumber: [''],
      gender: [],
      dateOfBirth: [''],
      image: [''],
      groupUserId: []
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.userService.getUserById(this.id).subscribe(
          result => {
            this.user = result;
            this.editUserForm.controls.email.setValue(result.email);
            this.editUserForm.controls.name.setValue(result.name);
            this.editUserForm.controls.address.setValue(result.address);
            this.editUserForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.editUserForm.controls.gender.setValue(result.gender);
            this.editUserForm.controls.dateOfBirth.setValue(new Date(result.dateOfBirth));
            this.editUserForm.controls.groupUserId.setValue(this.getGroupUserIdByName(result.groupRole));
          },
          () => {
            this.toastr.error(`Không tìm thấy sản phẩm này`);
          });
      }
    });
  }

  editUser() {
    this.user = Object.assign({}, this.editUserForm.value);
    this.user.gender = this.editUserForm.value.gender === 'true';
    this.user.groupUserId = Number(this.user.groupUserId);
    this.userService.editUser(this.id, this.user).subscribe(
      () => {
        this.router.navigate(['/users']).then(() => {
          this.toastr.success('Cập nhật tài khoản thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật tài khoản không thành công!');
      }
    );
  }

  get f() { return this.editUserForm.controls; }

  getGroupUserIdByName(name: string) {
    if (name === 'Admin') { return 1; }
    if (name === 'Staff') { return 2; }
    if (name === 'Customer') { return 3; }
  }

}
