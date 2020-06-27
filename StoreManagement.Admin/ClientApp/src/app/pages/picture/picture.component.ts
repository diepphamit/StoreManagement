import { Component, OnInit, TemplateRef } from '@angular/core';
import { Picture } from 'src/app/models/pictures/picture.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PictureService } from 'src/app/services/picture.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProductService } from 'src/app/services/product.sevice';
import { AuthService } from 'src/app/services/auth.service';

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
  itemsProduct: Observable<any[]>;
  permissons: string[];
  canDelete = false;
  canUpdate = false;
  canCreate = false;

  constructor(
    public pictureService: PictureService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService,
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.loadPermisson();
    this.getAllPictures(this.page);
    this.getAllProducts();
  }

  getAllPictures(page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.pictureService.getAllPictures(this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
          this.loadingBar.stop();
        }),
        map(response => response.items)
      );
  }

  getAllPicturesByProductId(id: any, page: number) {
    this.loadingBar.start();
    this.itemsAsync = this.pictureService.getAllPicturesById(id, '', page, this.pageSize)
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
    this.router.navigate(['/pictures/add']);
  }

  edit(id: any) {
    this.router.navigate(['/pictures/edit/' + id]);
  }

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

  getAllProducts() {
    this.itemsProduct = this.productService.getAllProducts('', 1, 1000)
      .pipe(
        map(response => response.items)
      );
  }

  filterPictures(id: any) {
    if (Number(id) === 0) {
      this.getAllPictures(this.page);
    } else {
      this.getAllPicturesByProductId(id, this.page);
    }
  }

  loadPermisson() {
    this.permissons = this.authService.getRoles().filter(x => x.includes('PICTURE'));

    if (this.permissons.filter(x => x.includes('DELETE')).length === 0) {
      this.canDelete = true;
    }

    if (this.permissons.filter(x => x.includes('UPDATE')).length === 0) {
      this.canUpdate = true;
    }

    if (this.permissons.filter(x => x.includes('CREATE')).length === 0) {
      this.canCreate = true;
    }
  }

}
