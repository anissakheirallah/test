import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RhRequestHolidayResponse } from '../models/rh-request-holiday-response.model';
import { RhRequestHoliday } from '../models/rh-request-holiday.model';

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private httpClient: HttpClient) { }

  createHoliday(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/rhrequestholiday`, data);
  }

  getHoliday(id: number): Observable<RhRequestHolidayResponse> {
    return this.httpClient.get<RhRequestHolidayResponse>(`${baseUrl}/rhrequestholiday/${id}`);
  }

  updateHoliday(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/rhrequestholiday/${id}`, data);
  }

  deleteHoliday(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/rhrequestholiday/${id}`, { responseType: 'text' });
  }

  deleteMultipleHoliday(ids: number[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('ids', ids.join(', '));
    const req = new HttpRequest('DELETE', `${baseUrl}/rhrequestholiday`, formData, { responseType: 'text' });
    return this.httpClient.request(req);
  }



  getHolidays(params: any): Observable<any> {
    return this.httpClient.get<RhRequestHoliday[]>(`${baseUrl}/rhrequestholiday`, { params });
  }
}
