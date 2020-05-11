import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryForEdit } from 'src/app/models/category/categoryForEdit.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup;
  category: CategoryForEdit;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.editCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.categoryService.getCategoryById(this.id).subscribe(
          result => {
            this.category = result;
            this.editCategoryForm.controls.name.setValue(result.name);
            this.editCategoryForm.controls.description.setValue(result.description);
          },
          () => {
            this.toastr.error('Không tìm thấy loại hàng này');
          });
      }
    });
  }

  editCategory() {
    this.category = Object.assign({}, this.editCategoryForm.value);

    this.categoryService.editCategory(this.id, this.category).subscribe(
      () => {
        this.router.navigate(['/categories']).then(() => {
          this.toastr.success('Cập nhật loại hàng thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật loại hàng không thành công!');
      }
    );
  }

  get f() { return this.editCategoryForm.controls; }
}
