import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models/category/category.model';
import { CategoryComponent } from '../category.component';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryForAdd } from 'src/app/models/category/categoryForAdd.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('CREATE_CATEGORY')).length === 0) {
      this.router.navigate(['/categories']);
    }
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
