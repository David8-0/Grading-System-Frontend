import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student';

@Pipe({
  name: 'searchByGrade',
  standalone: true,
})
export class SearchByGradePipe implements PipeTransform {
  transform(students: Student[], str: string): Student[] {
    return students.filter((student) =>
      student?.totalGrade.toLowerCase().includes(str.toLowerCase())
    );
  }
}
