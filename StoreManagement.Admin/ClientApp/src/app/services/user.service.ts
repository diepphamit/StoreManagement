import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  getAllUsers(keyword: string, page: Number, pageSize: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  editUser(id: any, user: any) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  // editUserFull(id: any, user: any) {
  //     return this.http.put(`${this.baseUrl}/UpdateUserFull/${id}`, user);
  // }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
