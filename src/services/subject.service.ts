import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../interfaces/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseUrl: string = 'http://localhost:5018/api/Subject/';
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Subject[]> {
    return this._http.get<Subject[]>(this.baseUrl);
  }
}
