import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CURRENT_USER } from 'src/app/constants/db-keys';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html'
})
export class UsersManagementComponent implements OnInit {
  user: User;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit() {
    if (this.getId !== 1) {
      this.router.navigate(['/home']);
    }
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllUsers(this.page);
  }

  getAllUsers(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.userService.getAllUsers(this.keyword, page, this.pageSize)
    .pipe(
      tap(response => {
        this.total = response.total;
        this.page = page;
        this.loadingBar.stop();
      }),
      map(response => response.items)
    );
  }

  add() {
    this.router.navigate(['/users/add']);
  }

  edit(id: any) {
    this.router.navigate(['/users/edit/' + id]);
  }

  // editFull(id: any) {
  //     this.router.navigate(['/users/editfull/' + id]);
  // }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.user = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id)
        .subscribe(
          () => {
            this.getAllUsers(this.page);
            this.toastr.success(`Xóa tài khoản thành công`);
          },
          (error: HttpErrorResponse) => {
            let errors: any;

            if (!errors.length) {
              errors.push(`Xóa tài khoản không thành công!`);
            }

            this.toastr.error(errors.join(','));
          }
        );
    }
    this.user = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.user = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllUsers(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllUsers(this.page);
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }
}
