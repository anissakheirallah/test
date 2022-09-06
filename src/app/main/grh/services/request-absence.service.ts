import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RequestAbsence } from "../models/request-absence.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class RequestAbsenceService {
  constructor(private httpClient: HttpClient) {}

  createRequestAbsence(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/requestabsence`, data);
  }

  getRequestAbsence(id: number): Observable<RequestAbsence> {
    return this.httpClient.get<RequestAbsence>(
      `${baseUrl}/requestabsence/${id}`
    );
  }

  updateRequestAbsence(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/requestabsence/${id}`, data);
  }

  deleteRequestAbsence(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/requestabsence/${id}`, {
      responseType: "text",
    });
  }

  getAbsenceRequestsByDate(date: Date): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getByDate/${date}`
    );
  }

  getAbsenceRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(`${baseUrl}/requestabsence`, {
      params,
    });
  }

  getPendingAbsenceRequests(): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getPending`
    );
  }

  getAcceptedAbsenceRequests(): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getAccepted`
    );
  }

  getRefusedAbsenceRequests(): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getRefused`
    );
  }

  getPendingAbsenceRequestsOfAnEmployee(id: number): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getPendingOfAnEmployee${id}`
    );
  }

  getAcceptedAbsenceRequestsOfAnEmployee(id: number): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getAcceptedOfAnEmployee${id}`
    );
  }

  getRefusedAbsenceRequestsOfAnEmployee(id: number): Observable<any> {
    return this.httpClient.get<RequestAbsence[]>(
      `${baseUrl}/requestabsence/getRefusedOfAnEmployee${id}`
    );
  }
}
