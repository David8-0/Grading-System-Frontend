import { StudentSubject } from './student-subject';

export interface Student {
  id?: number;
  nationalId: string;
  name: string;
  academicYear: number;
  totalGrade?: string;
  grades?: StudentSubject[];
}
