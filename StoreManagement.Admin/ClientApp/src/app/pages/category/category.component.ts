import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import {  BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category/category.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
    category: Category;
    keyword: string;
    itemsAsync: Observable<any[]>;
    modalRef: BsModalRef;
    page: Number;
    pageSize: Number;
    total: Number;

    constructor(
        // tslint:disable-next-line:no-shadowed-variable
        public CategoryService: CategoryService,
        private router: Router,
        private modalService: BsModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.keyword = '';
        this.page = 1;
        this.pageSize = 10;
        this.getAllCategories(this.page);
    }

    getAllCategories(page: Number) {
        this.itemsAsync = this.CategoryService.getAllCategories(this.keyword, page, this.pageSize)
        .pipe(
            tap(response => {
              this.total = response.total;
              this.page = page;
            }),
            map(response => response.items)
          );
    }

    add() {
        this.router.navigate(['/categories/add']);
    }

    edit(id: any) {
        this.router.navigate(['/categories/edit/' + id]);
    }

    // editFull(id: any) {
    //     this.router.navigate(['/users/editfull/' + id]);
    // }

    deleteConfirm(template: TemplateRef<any>, data: any) {
        this.category = Object.assign({}, data);
        this.modalRef = this.modalService.show(template);
    }

    confirm(): void {
        if (this.category) {
            this.CategoryService.deleteCategory(this.category.id)
                .subscribe(
                    () => {
                        this.getAllCategories(this.page);
                        this.toastr.success(`Xóa loại hàng thành công`);
                    },
                    (error: HttpErrorResponse) => {
                        this.toastr.error(('Xóa loại hàng không thành công'));
                    }
                );
        }
        this.category = undefined;
        this.modalRef.hide();
    }

    close(): void {
        this.category = undefined;
        this.modalRef.hide();
    }

    search() {
        this.getAllCategories(this.page);
    }

    refresh() {
        this.keyword = '';
        this.getAllCategories(this.page);
    }
    searchCharacter() {
        this.itemsAsync = this.CategoryService.getAllCategories(this.keyword, this.page, this.pageSize)
            .pipe(
                debounceTime(1000),
                tap(response => {
                    this.total = response.total;
                }),
                map(response => response.items)
            );
    }
}
