import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import {  BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Supplier } from 'src/app/models/supplier/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit {
    supplier: Supplier;
    keyword: string;
    itemsAsync: Observable<any[]>;
    modalRef: BsModalRef;
    page: number;
    pageSize: number;
    total: number;

    constructor(
        public supplierService: SupplierService,
        private router: Router,
        private modalService: BsModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.keyword = '';
        this.page = 1;
        this.pageSize = 10;
        this.getAllSuppliers(this.page);
    }

    getAllSuppliers(page: number) {
        this.itemsAsync = this.supplierService.getAllSuppliers(this.keyword, page, this.pageSize)
        .pipe(
             tap(response => {
                this.total = response.total;
                this.page = page;
            }),
            map(response => response.items)
            );
    }

    add() {
        this.router.navigate(['/suppliers/add']);
    }

    edit(id: any) {
        this.router.navigate(['/suppliers/edit/' + id]);
    }

    deleteConfirm(template: TemplateRef<any>, data: any) {
        this.supplier = Object.assign({}, data);
        this.modalRef = this.modalService.show(template);
    }

    confirm(): void {
        if (this.supplier) {
            this.supplierService.deleteSupplier(this.supplier.id)
                .subscribe(
                    () => {
                        this.getAllSuppliers(this.page);
                        this.toastr.success(`Xóa nhà cung cấp thành công`);
                    },
                    (error: HttpErrorResponse) => {
                        this.toastr.error(('Xóa nhà cung cấp  không thành công'));
                    }
                );
        }
        this.supplier = undefined;
        this.modalRef.hide();
    }

    close(): void {
        this.supplier = undefined;
        this.modalRef.hide();
    }

    search() {
        this.getAllSuppliers(this.page);
    }

    refresh() {
        this.keyword = '';
        this.getAllSuppliers(this.page);
    }

    searchCharacter() {
        this.itemsAsync = this.supplierService.getAllSuppliers(this.keyword, this.page, this.pageSize)
            .pipe(
                debounceTime(1000),
                tap(response => {
                    this.total = response.total;
                }),
                map(response => response.items)
            );
    }
}

