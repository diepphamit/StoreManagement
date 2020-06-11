import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable()
export class OrderService {
  baseUrl = environment.apiUrl + 'order';

  constructor(private http: HttpClient) {
  }

  getAllOrders(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllOrder?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getRevenue(date: Date): Observable<any> {
    const dateFormat = formatDate(date, 'MM-dd-yyyy', 'en-US');
    return this.http.get(`${this.baseUrl}/Revenue?date=${dateFormat}`);
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrder(order: any) {
    console.log(this.baseUrl);
    return this.http.post('http://localhost:5000/api/order', order);
  }

  editOrder(id: any, order: any) {
    return this.http.put(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
