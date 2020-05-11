import { Component, OnInit, TemplateRef } from '@angular/core';
import { Picture } from 'src/app/models/pictures/picture.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PictureService } from 'src/app/services/picture.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent implements OnInit {

  picture: Picture;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    public pictureService: PictureService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.getAllPictures();
  }

  getAllPictures() {
    this.itemsAsync = this.pictureService.getAllPictures(this.keyword);
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
            this.getAllPictures();
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
    this.getAllPictures();
  }

  refresh() {
    this.keyword = '';
    this.getAllPictures();
  }

}
