import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CurrentSituation } from '../models/current-situation';

const baseUrl = environment.apiBaseUrl;


@Injectable({
  providedIn: 'root'
})
export class CurrentSituationService {

  constructor(private http : HttpClient) { }

  getSituations() : Observable<CurrentSituation[]>
  {
    return this.http.get<CurrentSituation[]>(`${baseUrl}/situation`)
  }

  addSituation(cs : CurrentSituation) : Observable<any>
  {
    return this.http.post(`${baseUrl}/situation`,cs)
  }

  deleteSituation(id : number) : Observable<any>
  {
    return this.http.delete(`${baseUrl}/situation/${id}`,{  responseType : 'text'})
  }
}
