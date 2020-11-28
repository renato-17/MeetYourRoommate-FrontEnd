import {Component, OnInit, ViewChild} from '@angular/core';

import {Router} from "@angular/router";

import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Student} from "../../models/student";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  form: FormGroup;
  studentData: Student;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpDataService: StudentService, private router: Router, private formBuilder: FormBuilder) {
    this.studentData = {} as Student;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      getbSmoker: ['', [Validators.required]]
    });
  }

  addStudent(): void {
    const newStudent = {firstName: this.studentData.firstName, lastName: this.studentData.lastName, address: this.studentData.address};
    this.httpDataService.createItem(this.form.value);
  }

  onSubmit(): void {
    console.log(this.form.get('mail').value);
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.addStudent();
  }
}
