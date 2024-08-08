import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student';

@Pipe({
  name: 'searchByNationalId',
  standalone: true,
})
export class SearchByNationalIdPipe implements PipeTransform {
  transform(students: Student[], str: string): Student[] {
    return students.filter((student) =>
      student.nationalId.toLowerCase().includes(str.toLowerCase())
    );
  }
}
