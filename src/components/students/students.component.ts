import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student';
import { Subscription } from 'rxjs';
import { AcademicYear } from '../../interfaces/academic-year';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchByAcademicYearPipe } from '../../pipes/search-by-academic-year.pipe';
import { SearchByGradePipe } from '../../pipes/search-by-grade.pipe';
import { SearchByNamePipe } from '../../pipes/searchByName.pipe';
import { SearchByNationalIdPipe } from '../../pipes/search-by-national-id.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    AddEditStudentComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    SearchByAcademicYearPipe,
    SearchByGradePipe,
    SearchByNamePipe,
    SearchByNationalIdPipe,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  ediStudent: Student | null = null;
  students: Student[] = [];
  isShowDeleteWarning: boolean = false;
  haveGrades: boolean = true;
  deleteStudentId: number | null = null;
  subscriptionsList: Subscription[] = [];
  isShowAddEditStudent: boolean = false;

  nameSearchKey: string = '';
  academicYearSearchKey: string = '';
  nationalIdSearchKey: string = '';
  gradeSearchKey: string = '';

  constructor(private _StudentService: StudentService) {}

  ngOnInit(): void {
    const sub = this._StudentService.studentsList.subscribe((students) => {
      this.students = students;
    });
    this.subscriptionsList.push(sub);
    this._StudentService.getAll().subscribe({
      next: (students) => {
        this._StudentService.studentsList.next(students);
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach((sub) => sub.unsubscribe());
  }
  hideDeleteMessage() {
    this.isShowDeleteWarning = false;
    this.deleteStudentId = null;
  }
  deleteBook() {
    if (this.deleteStudentId) {
      this._StudentService.delete(this.deleteStudentId).subscribe({
        next: (students) => {
          this._StudentService.studentsList.next(students);
        },
        error: (err) => console.log(err),
      });
      this.isShowDeleteWarning = false;
      this.deleteStudentId = null;
    }
  }

  showDeleteMessage(student: Student) {
    this.isShowDeleteWarning = true;
    this.deleteStudentId = student.id ?? null;
    if (student.grades) {
      student.grades?.length > 0
        ? (this.haveGrades = true)
        : (this.haveGrades = false);
    }
  }

  showAddEditStudent(student: Student | undefined) {
    if (student) this.ediStudent = student;
    this.isShowAddEditStudent = true;
  }

  hideAddEditStudent() {
    this.isShowAddEditStudent = false;
    this.ediStudent = null;
  }

  resetSearchParameters() {
    this.nameSearchKey = '';
    this.academicYearSearchKey = '';
    this.nationalIdSearchKey = '';
    this.gradeSearchKey = '';
  }
}
