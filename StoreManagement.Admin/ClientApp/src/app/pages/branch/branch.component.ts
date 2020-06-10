import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, map, debounceTime } from 'rxjs/operators';
import { Branch } from 'src/app/models/branch/branch.model';
import { BranchService } from 'src/app/services/branch.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html'
})
export class BranchComponent implements OnInit {

  branch: Branch;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public branchService: BranchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllBranches(this.page);
  }

  getAllBranches(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.branchService.getAllBranches(this.keyword, page, this.pageSize)
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
    this.router.navigate(['/branches/add']);
  }

  edit(id: any) {
    this.router.navigate(['/branches/edit/' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.branch = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.branch) {
      this.branchService.deleteBranch(this.branch.id)
        .subscribe(
          () => {
            this.getAllBranches(this.page);
            this.toastr.success(`Xóa chi nhánh thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(`Xóa chi nhánh không thành công!`);
          }
        );
    }
    this.branch = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.branch = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllBranches(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllBranches(this.page);
  }

  searchCharacter() {
    this.itemsAsync = this.branchService.getAllBranches(this.keyword, this.page, this.pageSize)
        .pipe(
            debounceTime(1000),
            tap(response => {
                this.total = response.total;
            }),
            map(response => response.items)
        );
}

}
