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

  constructor(private httpDataService: StudentService, private router: Router, private formBuilder: FormBuilder) {
    this.studentData = {} as Student;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      isbSmoker: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  addStudent(): void {
    const newStudent = {
      firstName:  this.form.get("firstName").value,
      lastName: this.form.get("lastName").value,
      dni: this.form.get("dni").value,
      phoneNumber:  this.form.get("phoneNumber").value,
      gender:  this.form.get("gender").value,
      birthdate: this.form.get("birthdate").value,
      address:  this.form.get("address").value,
      description: this.form.get("description").value,
      hobbies:  this.form.get("hobbies").value,
      isbSmoker:  this.form.get("isbSmoker").value,
      mail: this.form.get("mail").value,
      password:  this.form.get("password").value,
    }
    console.log("New Student: ");
    console.log(newStudent);console.log(this.form.getRawValue());
    this.httpDataService.createItem(newStudent);
  }

  onSubmit(): void {
    console.log(this.form);
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }
    console.log("Form is valid");
    this.addStudent();
    this.router.navigate(['/']).then(() => null);
  }
}
