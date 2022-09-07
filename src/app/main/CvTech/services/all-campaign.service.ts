
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class AllCampaignService {

  constructor(private http: HttpClient) { }

  getAllCampaign(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/campaign`);
  }

  getbyid(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/campaign/${id}`);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/campaign`, { params });
  }

  DeleteCampaignById(id: number): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(`${baseUrl}/campaign/${id}`);
  }

  addCampaign(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/campaign`, data);
  }


}
