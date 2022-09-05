import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Education } from '../models/education';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http : HttpClient) { }

  getEducations(): Observable<Education[]> 
  {
    return this.http.get<Education[]>(`${baseUrl}/education`);
  }

  addEducation(education : Education): Observable<any>
  {
    return this.http.post(`${baseUrl}/education`,education);
  }

  deleteEducation(id : number): Observable<any>
  {
    return this.http.delete(`${baseUrl}/education/${id}`,{responseType : 'text'});
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Education[]>(`${baseUrl}/education`, { params });
  }

  update(data: any, id: number): Observable<HttpEvent<any>> {
    return this.http.put<HttpEvent<any>>(`${baseUrl}/education/${id}`, data);
  }
}
