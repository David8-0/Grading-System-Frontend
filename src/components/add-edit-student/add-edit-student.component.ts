import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AcademicYear } from '../../interfaces/academic-year';
import { StudentService } from '../../services/student.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-add-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-student.component.html',
  styleUrl: './add-edit-student.component.scss',
})
export class AddEditStudentComponent implements OnInit, OnChanges {
  @Input() student: Student | null = null;
  @Output() isVisible = new EventEmitter<boolean>();
  academicYears: AcademicYear[] = [];
  showErrors: boolean = false;
  serverError: string = '';
  constructor(private _StudentService: StudentService) {}
  ngOnInit(): void {
    this._StudentService.getAcademicYears().subscribe({
      next: (res) => {
        this.academicYears = res;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.student) {
      this.addEditStudentForm
        .get('nationalId')
        ?.setValue(this.student.nationalId);
      this.addEditStudentForm.get('name')?.setValue(this.student.name);
      this.addEditStudentForm
        .get('academicYearId')
        ?.setValue(this.student.academicYearId);
    }
  }

  addEditStudentForm: FormGroup = new FormGroup({
    nationalId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{14}$/),
    ]),
    name: new FormControl('', [Validators.required]),
    academicYearId: new FormControl('', [Validators.required]),
  });

  submitForm(form: FormGroup) {
    if (form.valid && !this.student) {
      this._StudentService.Add(form.value).subscribe({
        next: (res) => {
          this._StudentService.studentsList.next(res);
          this.isVisible.emit(false);
        },
        error: (err) => {
          this.serverError = err.error.message;
        },
      });
    } else if (form.valid && this.student?.id) {
      this._StudentService.update(form.value, this.student.id).subscribe({
        next: (res) => {
          this._StudentService.studentsList.next(res);
          this.isVisible.emit(false);
        },
        error: (err) => {
          this.serverError = err.error.message;
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
