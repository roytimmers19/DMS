import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Rit} from "@app/_models/rit";

@Injectable({
  providedIn: 'root'
})
export class RitService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Rit[]>(`${environment.apiUrl}/ritten`);
  }

  getById(id: number) {
    return this.http.get<Rit>(`${environment.apiUrl}/ritten/${id}`);
  }

  updateRit(rit: Rit) {
    return this.http.put<Rit>(`${environment.apiUrl}/ritten/${rit.id}`, rit);
  }

  addRit(rit: Rit) {
    return this.http.post<Rit>(`${environment.apiUrl}/ritten`, rit);
  }
}
