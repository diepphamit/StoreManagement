import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BranchProductService {
  baseUrl = environment.apiUrl + 'BranchProduct';

  constructor(private http: HttpClient) {
  }

  getAllBranchProducts(id: any, keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?branchId=${id}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getAllBranchesById(id: number, keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?branchId=${id}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getBranchProductById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBranchProduct(branchProduct: any) {
    return this.http.post(this.baseUrl, branchProduct);
  }

  editBranchProduct(id: any, branchProduct: any) {
    return this.http.put(`${this.baseUrl}/${id}`, branchProduct);
  }

  deleteBranchProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
