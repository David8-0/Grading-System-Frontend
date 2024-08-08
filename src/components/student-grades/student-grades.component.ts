import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [],
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.scss',
})
export class StudentGradesComponent implements OnInit, OnDestroy {
  studentId: number | null = null;
  subscription: Subscription = new Subscription();
  student: Student = {} as Student;
  constructor(
    private _activateRoute: ActivatedRoute,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.subscription = this._activateRoute.paramMap.subscribe((params) => {
      this.studentId = Number(params.get('id'));
      this._studentService.getById(this.studentId).subscribe({
        next: (res) => {
          this.student = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
