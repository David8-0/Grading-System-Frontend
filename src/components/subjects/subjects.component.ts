import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../interfaces/subject';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  selectedSubject: Subject = {} as Subject;
  constructor(private _subjectService: SubjectService) {}

  ngOnInit(): void {
    this._subjectService.getAll().subscribe({
      next: (res) => {
        this.subjects = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
