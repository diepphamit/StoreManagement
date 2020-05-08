import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  baseUrl = 'http://localhost:5000/api/' + 'category';

  constructor(private http: HttpClient) {
  }

  getAllCategories(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}`);
  }

  getCategoryById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createCategory(category: any) {
    return this.http.post(this.baseUrl, category);
  }

  editCategory(id: any, category: any) {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  // editUserFull(id: any, user: any) {
  //     return this.http.put(`${this.baseUrl}/UpdateUserFull/${id}`, user);
  // }

  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}