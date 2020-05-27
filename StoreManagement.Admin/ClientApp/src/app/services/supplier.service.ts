import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService {
  baseUrl = environment.apiUrl + 'supplier';

  constructor(private http: HttpClient) {
  }

  getAllSuppliers(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getSuppliersById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSupplier(supplier: any) {
    return this.http.post(this.baseUrl, supplier);
  }

  editSupplier(id: any, supplier: any) {
    return this.http.put(`${this.baseUrl}/${id}`, supplier);
  }

  deleteSupplier(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
