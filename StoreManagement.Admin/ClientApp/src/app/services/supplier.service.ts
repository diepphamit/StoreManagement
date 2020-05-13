import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService {
  baseUrl = environment.apiUrl + 'supplier';

  constructor(private http: HttpClient) {
  }

  getAllSuppliers(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}`);
  }

  getSuppliersById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createSupplier(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  editSupplier(id: any, supplier: any) {
    return this.http.put(`${this.baseUrl}/${id}`, supplier);
  }

  // editUserFull(id: any, user: any) {
  //     return this.http.put(`${this.baseUrl}/UpdateUserFull/${id}`, user);
  // }

  deleteSupplier(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
