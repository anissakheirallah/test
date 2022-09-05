import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { EntityDepartment } from '../models/entity-department.model';

// const baseUrl = 'http://localhost:8091/api';
const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class EntityDepartmentService {

  constructor(private httpClient: HttpClient) { }

  createDepartment(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/EntityDepartment`, data);
  }

  getDepartment(id: number): Observable<EntityDepartment> {
    return this.httpClient.get<EntityDepartment>(`${baseUrl}/EntityDepartment/${id}`);
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/EntityDepartment/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/EntityDepartment/${id}`, { responseType: 'text' });
  }

  getDepartments(params: any): Observable<any> {
    return this.httpClient.get<EntityDepartment[]>(`${baseUrl}/EntityDepartment`, { params });
  }
}
