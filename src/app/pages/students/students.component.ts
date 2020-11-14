import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Student} from '../../models/student';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;
  isEditMode = false;
  studentId: number;
  studentData: Student = new Student();
  defaultStudent = { id: 0, name: '', lastName: '', dni: '', phoneNumber: '', gender: '',
    birthDate: '', address: '', description: '', hobbies: '', getBSmoker: false};
  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
