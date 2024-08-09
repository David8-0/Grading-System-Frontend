import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StudentSubject } from '../../interfaces/student-subject';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StudentSubjectService } from '../../services/student-subject.service';

@Component({
  selector: 'app-add-edit-grades',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-grades.component.html',
  styleUrl: './add-edit-grades.component.scss',
})
export class AddEditGradesComponent implements OnChanges {
  @Input() grade: StudentSubject | null = {} as StudentSubject;
  @Input() subjectId: number = 0;
  @Input() maximumDegree: number = 0;
  @Output() isVisible = new EventEmitter<boolean>();
  showErrors: boolean = false;
  serverError: string = '';

  constructor(private _studentSubjectService: StudentSubjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.grade && this.grade?.studentId > 0) {
      this.addEditStudentGradeForm
        .get('studentId')
        ?.setValue(this.grade?.studentId);

      this.addEditStudentGradeForm.get('term1')?.setValue(this.grade.term1);
      this.addEditStudentGradeForm.get('term2')?.setValue(this.grade.term2);
    }
    this.addEditStudentGradeForm.get('subjectId')?.setValue(this.subjectId);

    if (changes['maximumDegree']) {
      this.addEditStudentGradeForm
        .get('term1')
        ?.setValidators([Validators.max(this.maximumDegree)]);
      this.addEditStudentGradeForm
        .get('term2')
        ?.setValidators([Validators.max(this.maximumDegree)]);
      this.addEditStudentGradeForm.get('term1')?.updateValueAndValidity();
      this.addEditStudentGradeForm.get('term2')?.updateValueAndValidity();
    }
  }

  addEditStudentGradeForm: FormGroup = new FormGroup({
    studentId: new FormControl('', [Validators.required]),
    subjectId: new FormControl('', [Validators.required]),
    term1: new FormControl(''),
    term2: new FormControl(''),
  });

  submitForm(form: FormGroup) {
    if (form.valid && this.grade) {
      this._studentSubjectService.update(form.value).subscribe({
        next: (res) => {
          this._studentSubjectService.SubjectsList.next(res);
          this.isVisible.emit(false);
        },
        error: (err) => {
          this.serverError = err.error;
        },
      });
    } else if (form.valid && !this.grade) {
      this._studentSubjectService.Add(form.value).subscribe({
        next: (res) => {
          this._studentSubjectService.SubjectsList.next(res);
          this.isVisible.emit(false);
        },
        error: (err) => {
          this.serverError = err.error;
        },
      });
    } else {
      this.showErrors = true;
    }
  }

  cancel() {
    this.isVisible.emit(false);
  }
}
