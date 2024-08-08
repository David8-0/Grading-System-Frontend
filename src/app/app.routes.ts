import { Routes } from '@angular/router';
import { StudentGradesComponent } from '../components/student-grades/student-grades.component';
import { StudentsComponent } from '../components/students/students.component';
import { SubjectsComponent } from '../components/subjects/subjects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'grades/:id', component: StudentGradesComponent },
];
