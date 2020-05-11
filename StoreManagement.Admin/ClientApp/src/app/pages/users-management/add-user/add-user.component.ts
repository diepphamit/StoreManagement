import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  user: User;
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
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: [''],
      address: [''],
      phoneNumber: [''],
      gender: [true],
      dateOfBirth: [''],
      image: [''],
      groupUserId: [3]
    });
  }

  ngOnInit() {
  }

  addUser() {
    this.user = Object.assign({}, this.addUserForm.value);
    this.userService.createUser(this.user).subscribe(
      () => {
        this.router.navigate(['/users']).then(() => {
          this.toastr.success('Tạo tài khoản thành công');
        });
      },
      (error: HttpErrorResponse) =>
        this.toastr.error('Tạo tài khoản không thành công!')
      );
  }

  get f() { return this.addUserForm.controls; }
}
