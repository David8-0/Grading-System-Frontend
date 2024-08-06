import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  isShowDeleteWarning: boolean = false;
  haveGrades: boolean = true;
  deleteStudentId: number | null = null;
  subscriptionsList: Subscription[] = [];
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
}
