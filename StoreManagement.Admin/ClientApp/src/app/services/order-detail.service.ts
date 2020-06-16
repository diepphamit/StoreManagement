import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderDetailService {
  baseUrl = environment.apiUrl + 'orderdetail';

  constructor(private http: HttpClient) {
  }

  getAllOrderDetails(id: any, keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?orderId=${id}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getOrderDetailById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createOrderDetail(orderdetail: any) {
    return this.http.post(this.baseUrl, orderdetail);
  }

  editOrderDetail(id: any, orderdetail: any) {
    return this.http.put(`${this.baseUrl}/${id}`, orderdetail);
  }

  deleteOrderDetail(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
