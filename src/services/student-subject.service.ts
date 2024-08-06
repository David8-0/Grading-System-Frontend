import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentSubject } from '../interfaces/student-subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentSubjectService {
  baseUrl: string = 'http://localhost:5018/api/Subject/';
  constructor(private _http: HttpClient) {}

  Add(studentSubject: StudentSubject): Observable<any> {
    return this._http.post<any>(this.baseUrl, studentSubject);
  }

  update(studentSubject: StudentSubject): Observable<any> {
    return this._http.put<any>(this.baseUrl, studentSubject);
  }
}
