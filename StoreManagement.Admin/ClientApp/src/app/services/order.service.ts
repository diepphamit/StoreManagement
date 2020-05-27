import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
  baseUrl = environment.apiUrl + 'order';

  constructor(private http: HttpClient) {
  }

  getAllOrders(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}`);
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrder(order: any) {
    return this.http.post(this.baseUrl, order);
  }

  editOrder(id: any, order: any) {
    return this.http.put(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
