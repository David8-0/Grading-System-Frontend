import { StudentSubjectService } from './../../services/student-subject.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from '../../interfaces/subject';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddEditGradesComponent } from '../add-edit-grades/add-edit-grades.component';
import { StudentSubject } from '../../interfaces/student-subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [FormsModule, CommonModule, AddEditGradesComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjects: Subject[] = [];
  index: number = 0;
  isShowAddEditGrades: boolean = false;
  studentGradeToEdit: StudentSubject | null = null;
  sub: Subscription = new Subscription();
  constructor(private _subjectService: StudentSubjectService) {}

  ngOnInit(): void {
    this._subjectService.getAll().subscribe({
      next: (res) => {
        this.subjects = res;
        this._subjectService.SubjectsList.next(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.sub = this._subjectService.SubjectsList.subscribe((newSubjects) => {
      this.subjects = newSubjects;
    });
  }

  addStudentGrade() {
    this.studentGradeToEdit = null;
    this.isShowAddEditGrades = true;
  }

  editStudentGrade(grade: StudentSubject) {
    this.studentGradeToEdit = grade;
    this.isShowAddEditGrades = true;
  }

  cancelEditStudentGrade() {
    this.studentGradeToEdit = null;
    this.isShowAddEditGrades = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
