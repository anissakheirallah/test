import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) { }

  createCv(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}`,data);
  }
}
