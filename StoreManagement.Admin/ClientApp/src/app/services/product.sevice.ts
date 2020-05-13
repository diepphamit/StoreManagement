import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  baseUrl = environment.apiUrl + 'product';

  constructor(private http: HttpClient) {
  }

  getAllProducts(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  editProduct(id: any, product: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  // editUserFull(id: any, user: any) {
  //     return this.http.put(`${this.baseUrl}/UpdateUserFull/${id}`, user);
  // }

  deleteProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
