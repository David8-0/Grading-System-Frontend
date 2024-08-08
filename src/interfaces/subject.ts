import { StudentSubject } from './student-subject';

export interface Subject {
  maximumDegree: number;
  subjectId: string;
  subjectName: string;
  studentGrades: StudentSubject[];
  succeededStudentsNumber: number;
  failedStudentsNumber: number;
}
