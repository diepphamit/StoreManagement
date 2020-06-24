import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PictureForAdd } from 'src/app/models/pictures/pictureForAdd.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PictureService } from 'src/app/services/picture.service';
import { ProductService } from 'src/app/services/product.sevice';
import { tap, map } from 'rxjs/operators';
import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { PictureToUpload } from 'src/app/models/pictures/pictureToUpload.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html'
})
export class AddPictureComponent implements OnInit {

  addPictureForm: FormGroup;
  picture: PictureForAdd;

  upload: PictureToUpload = new PictureToUpload;
  public files: NgxFileDropEntry[] = [];

  products: Observable<any[]>;
  suppliers: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pictureService: PictureService,
    private productService: ProductService,
    private toastr: ToastrService,
    private authService: AuthService,
    private loadingBar: LoadingBarService
  ) {
    this.addPictureForm = this.fb.group({
      // imageUrl: ['', Validators.required],
      productId: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('CREATE_PICTURE')).length === 0) {
      this.router.navigate(['/pictures']);
    }

    this.getAllProducts();
  }

  getAllProducts() {
    this.products = this.productService.getAllProducts('', 1, 1000).pipe(
      map(response => response.items)
    );
  }

  addPicture() {
    this.loadingBar.start();
    this.picture = Object.assign({}, this.addPictureForm.value);
    this.picture.productId = Number(this.picture.productId);
    this.upload.productId = this.picture.productId;

    this.pictureService.createPicture(this.upload).subscribe(
      () => {
        this.router.navigate(['/pictures']).then(() => {
          this.toastr.success('Tạo hình ảnh thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.loadingBar.stop();
        this.toastr.error('Tạo hình ảnh không thành công!');
      }
    );
  }

  get f() { return this.addPictureForm.controls; }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
           this.upload.file = file;
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }


  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
