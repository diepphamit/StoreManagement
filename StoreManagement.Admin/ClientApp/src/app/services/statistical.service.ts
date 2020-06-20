import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatisticalService {
  baseUrl = environment.apiUrl + 'statistical';

  constructor(private http: HttpClient) {
  }

  getAllCustomers(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetCustomers?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }
  getAllStaffs(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetStaffs?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }
}
