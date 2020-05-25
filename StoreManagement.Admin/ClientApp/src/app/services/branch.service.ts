import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BranchService {
  baseUrl = environment.apiUrl + 'branch';

  constructor(private http: HttpClient) {
  }

  getAllBranches(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getBranchById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBranch(branch: any) {
    return this.http.post(this.baseUrl, branch);
  }

  editBranch(id: any, branch: any) {
    return this.http.put(`${this.baseUrl}/${id}`, branch);
  }

  deleteBranch(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
