import { Student } from './../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AcademicYear } from '../interfaces/academic-year';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl: string = 'http://localhost:5018/api/Student/';
  studentsList: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl);
  }

  getAcademicYears(): Observable<AcademicYear[]> {
    return this._http.get<AcademicYear[]>(this.baseUrl + 'academicyears');
  }

  getById(id: number): Observable<Student> {
    return this._http.get<Student>(this.baseUrl + `${id}`);
  }

  Add(student: Student): Observable<Student[]> {
    return this._http.post<Student[]>(this.baseUrl, student);
  }

  update(student: Student, id: number): Observable<Student[]> {
    return this._http.put<Student[]>(this.baseUrl + `${id}`, student);
  }

  delete(id: number): Observable<Student[]> {
    return this._http.delete<Student[]>(this.baseUrl + `${id}`);
  }
}
