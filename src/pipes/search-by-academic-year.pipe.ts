import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student';

@Pipe({
  name: 'searchByAcademicYear',
  standalone: true,
})
export class SearchByAcademicYearPipe implements PipeTransform {
  transform(students: Student[], str: string): Student[] {
    return students.filter((student) =>
      student.academicYear.toLowerCase().includes(str.toLowerCase())
    );
  }
}
