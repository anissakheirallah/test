import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Availability } from '../models/availability';

const baseUrl = environment.UrlCvTech;


@Injectable({
  providedIn: 'root'
})
export class AvailabiltyService {

  constructor(private http : HttpClient) { }

  public getAvailabilties() : Observable<Availability[]>
  {
    return this.http.get<Availability[]>(`${baseUrl}/availablity`)
  }

  public addAvailability(availability : Availability) : Observable<any>
  {
    return this.http.post(`${baseUrl}/availablity`,availability)
  } 

  public deleteAvailability(id : number) : Observable<any>
  {
    return this.http.delete(`${baseUrl}/availablity/${id}`,{responseType : 'text'})
  }

  public getAllPagination( params: any ): Observable<any>
  {
    return this.http.get<Availability[]>(`${baseUrl}/availablity`, { params } )
  }

  update(data: any, id: number): Observable<HttpEvent<any>> {
    return this.http.put<HttpEvent<any>>(`${baseUrl}/availablity/${id}`, data);
  }

}
