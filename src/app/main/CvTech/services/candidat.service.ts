import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Candidat } from "../models/candidat.model";

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: "root",
})
export class CandidatService {
  constructor(private http: HttpClient) {}

  getAllCandidat(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${baseUrl}/candidat`);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Candidat[]>(`${baseUrl}/candidat`, { params });
  }
}
