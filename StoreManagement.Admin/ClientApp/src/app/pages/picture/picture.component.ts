import { Component, OnInit, TemplateRef } from '@angular/core';
import { Picture } from 'src/app/models/pictures/picture.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PictureService } from 'src/app/services/picture.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent implements OnInit {

  picture: Picture;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public pictureService: PictureService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllPictures(this.page);
  }

  getAllPictures(page: number) {
    this.itemsAsync = this.pictureService.getAllPictures(this.keyword, page, this.pageSize)
    .pipe(
      tap(response => {
        this.total = response.total;
        this.page = page;
      }),
      map(response => response.items)
    );
  }

  add() {
    this.router.navigate(['/pictures/add']);
  }

  edit(id: any) {
    this.router.navigate(['/pictures/edit/' + id]);
  }

  // editFull(id: any) {
  //     this.router.navigate(['/users/editfull/' + id]);
  // }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.picture = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.picture) {
      this.pictureService.deletePicture(this.picture.id)
        .subscribe(
          () => {
            this.getAllPictures(this.page);
            this.toastr.success(`Xóa hình ảnh thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(`Xóa hình ảnh không thành công!`);
          }
        );
    }
    this.picture = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.picture = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllPictures(this.page);
  }

  refresh() {
    this.keyword = '';
    this.getAllPictures(this.page);
  }

}
