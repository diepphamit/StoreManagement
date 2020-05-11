import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

    constructor(
        public supplierService: SupplierService,
        private router: Router,
        private modalService: BsModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.keyword = '';
        this.getAllSuppliers();
    }

    getAllSuppliers() {
        this.itemsAsync = this.supplierService.getAllSuppliers(this.keyword);
    }

    add() {
        this.router.navigate(['/suppliers/add']);
    }

    edit(id: any) {
        this.router.navigate(['/suppliers/edit/' + id]);
    }

    // editFull(id: any) {
    //     this.router.navigate(['/users/editfull/' + id]);
    // }

    deleteConfirm(template: TemplateRef<any>, data: any) {
        this.supplier = Object.assign({}, data);
        this.modalRef = this.modalService.show(template);
    }

    confirm(): void {
        if (this.supplier) {
            this.supplierService.deleteSupplier(this.supplier.id)
                .subscribe(
                    () => {
                        this.getAllSuppliers();
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
        this.getAllSuppliers();
    }

    refresh() {
        this.keyword = '';
        this.getAllSuppliers();
    }
}
