import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentSubject } from '../interfaces/student-subject';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root',
})
export class StudentSubjectService {
  baseUrl: string = 'http://localhost:5018/api/StudentSubject/';
  SubjectsList: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  constructor(private _http: HttpClient) {}

  Add(studentSubject: StudentSubject): Observable<any> {
    return this._http.post<any>(this.baseUrl, studentSubject);
  }

  update(studentSubject: StudentSubject): Observable<any> {
    return this._http.put<any>(this.baseUrl, studentSubject);
  }

  getAll(): Observable<Subject[]> {
    return this._http.get<Subject[]>(this.baseUrl);
  }
}
