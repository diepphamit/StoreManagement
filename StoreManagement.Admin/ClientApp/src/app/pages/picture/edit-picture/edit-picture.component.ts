import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PictureForEdit } from 'src/app/models/pictures/pictureForEdit.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PictureService } from 'src/app/services/picture.service';
import { ProductService } from 'src/app/services/product.sevice';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html'
})
export class EditPictureComponent implements OnInit {

  editPictureForm: FormGroup;
  picture: PictureForEdit;
  id: any;
  products: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private pictureService: PictureService,
    private toastr: ToastrService
  ) {
    this.editPictureForm = this.fb.group({
      productId: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.products = this.productService.getAllProducts('', 1, 1);

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.pictureService.getPictureById(this.id).subscribe(
          result => {
            this.picture = result;
            this.editPictureForm.controls.productId.setValue(result.productId);
            this.editPictureForm.controls.imageUrl.setValue(result.imageUrl);
          },
          () => {
            this.toastr.error(`Không tìm thấy hình ảnh này`);
          });
      }
    });
  }

  editPicture() {
    this.picture = Object.assign({}, this.editPictureForm.value);
    this.picture.productId = Number(this.picture.productId);

    this.pictureService.editPicture(this.id, this.picture).subscribe(
      () => {
        this.router.navigate(['/pictures']).then(() => {
          this.toastr.success('Cập nhật hình ảnh thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật hình ảnh không thành công!');
      }
    );
  }

  get f() { return this.editPictureForm.controls; }
}
