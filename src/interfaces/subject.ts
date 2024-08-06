import { StudentSubject } from './student-subject';

export interface Subject {
  subjectId: string;
  subjectName: string;
  studentGrades: StudentSubject[];
  succeededStudentsNumber: number;
  failedStudentsNumber: number;
}
