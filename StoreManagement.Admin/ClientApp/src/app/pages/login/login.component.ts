import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/user/user-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginModel: UserLogin = new UserLogin();

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginModel).subscribe(
      response => {
        this.router.navigate(['/home']).then(() => {
          this.toastr.success('Đăng nhập thành công!');
        });
      },
      error => {
        this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    );
  }

}
