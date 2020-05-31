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

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html'
})
export class AddPictureComponent implements OnInit {

  addPictureForm: FormGroup;
  picture: PictureForAdd;

  products: Observable<any[]>;
  suppliers: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pictureService: PictureService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.addPictureForm = this.fb.group({
      imageUrl: ['', Validators.required],
      productId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = this.productService.getAllProducts('', 1, 1000).pipe(
      map(response => response.items)
    );
  }

  addPicture() {
    this.picture = Object.assign({}, this.addPictureForm.value);
    this.picture.productId = Number(this.picture.productId);

    this.pictureService.createPicture(this.picture).subscribe(
      () => {
        this.router.navigate(['/pictures']).then(() => {
          this.toastr.success('Tạo hình ảnh thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Tạo hình ảnh không thành công!');
      }
    );
  }

  get f() { return this.addPictureForm.controls; }

}
