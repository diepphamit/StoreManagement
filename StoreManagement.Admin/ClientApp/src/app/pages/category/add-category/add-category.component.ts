import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryForAdd } from 'src/app/models/category/categoryForAdd.model';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm: FormGroup;
  category: CategoryForAdd;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', [ValidationService.requireValue]],
      description: ['', [ValidationService.requireValue]]
    });
  }

  ngOnInit() {
  }

  addCategory() {
    this. category = Object.assign({}, this.addCategoryForm.value);
    this.categoryService.createCategory(this.category).subscribe(
      () => {
        this.router.navigate(['/categories']).then(() => {
          this.toastr.success('Thêm loại hàng thành công');
        });
      },
      (error: HttpErrorResponse) =>
        this.toastr.error('Thêm loại hàng không thành công!')
      );
  }

  get f() { return this.addCategoryForm.controls; }
}
