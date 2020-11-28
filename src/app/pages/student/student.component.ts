import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Student} from '../../models/student';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {StudentService} from '../../services/student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;
  isEditMode = false;
  studentId: number;
  studentData: Student = new Student();
  defaultStudent = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    phoneNumber: '',
    gender: '',
    birthdate: null,
    address: '',
    description: '',
    hobbies: '',
    getbSmoker: null,
    mail: '',
    password: ''
  };
  constructor(private httpDataService: StudentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveStudent(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetStudent();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToStudents(): void {
    this.router.navigate(['/students']);
  }
  resetStudent(): void {
    this.studentData = this.defaultStudent;
  }
  retrieveStudent(id): void {
    this.httpDataService.getItem(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
  addStudent(): void {
    const newStudent = {firstName: this.studentData.firstName, lastName: this.studentData.lastName, address: this.studentData.address};
    this.httpDataService.createItem(newStudent)
      .subscribe(() => {
        this.navigateToStudents();
      });
  }
  cancelEdit(): void {
    this.navigateToStudents();
  }

  updateStudent(): void {
    this.httpDataService.updateItem(this.studentData.id, this.studentData as Student);
    this.navigateToStudents();
  }
  onSubmit(): void {
    if (this.studentForm.form.valid) {
      console.log(this.studentData);
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }

}
