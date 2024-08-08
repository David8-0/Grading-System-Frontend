import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student';

@Pipe({
  name: 'searchByName',
  standalone: true,
})
export class SearchByNamePipe implements PipeTransform {
  transform(students: Student[], str: string): Student[] {
    return students.filter((student) =>
      student.name.toLowerCase().includes(str.toLowerCase())
    );
  }
}
