import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable()
export class OrderProductService {
  baseUrl = environment.apiUrl + 'order';

  constructor(private http: HttpClient) {
  }

  createOrder(order: any) {
    console.log(this.baseUrl);
    console.log(order);
    return this.http.post(this.baseUrl, order);
  }
}
