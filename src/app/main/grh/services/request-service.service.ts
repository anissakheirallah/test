import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RhRequest } from '../models/rh-request.model';

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor(private httpClient: HttpClient) { }

  createRhRequest(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/rhrequest`, data);
  }

  getRhRequest(id: number): Observable<RhRequest> {
    return this.httpClient.get<RhRequest>(`${baseUrl}/rhrequest/${id}`);
  }

  updateRhRequest(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/rhrequest/${id}`, data);
  }

  deleteRhRequest(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/rhrequest/${id}`, { responseType: 'text' });
  }

  getRhRequests(params: any): Observable<any> {
    return this.httpClient.get<RhRequest[]>(`${baseUrl}/rhrequest`, { params });
  }
}
