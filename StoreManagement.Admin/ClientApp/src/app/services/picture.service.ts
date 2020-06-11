import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PictureService {
  baseUrl = environment.apiUrl + 'picture';

  constructor(private http: HttpClient) {
  }

  getAllPictures(keyword: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getPictureById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // getUserFullById(id: any): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/GetUserFullById/${id}`);
  // }

  createPicture(picture: any) {
    const formData = new FormData();
    formData.append('formFile', picture.file, picture.file.name);
    formData.append('productId', picture.productId);

    return this.http.post(this.baseUrl, formData);
  }

  editPicture(id: any, picture: any) {
    return this.http.put(`${this.baseUrl}/${id}`, picture);
  }

  // editUserFull(id: any, user: any) {
  //     return this.http.put(`${this.baseUrl}/UpdateUserFull/${id}`, user);
  // }

  deletePicture(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
