import { StudentSubject } from './student-subject';

export interface Student {
  id?: number;
  nationalId: string;
  name: string;
  academicYearId: number;
  academicYear: string;
  totalGrade: string;
  grades?: StudentSubject[];
}
