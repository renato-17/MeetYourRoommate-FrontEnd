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
      firstName: ['', [Validators.required], Validators.minLength(5)],
      lastName: ['', [Validators.required], Validators.minLength(5)],
      dni: ['', [Validators.required], Validators.minLength(8), Validators.maxLength(8)],
      phoneNumber: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      hobbies: ['', [Validators.required], Validators.minLength(10)],
      isbSmoker: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    console.log(newStudent);
    this.httpDataService.createItem(newStudent).subscribe(()=>{});
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

  get mail() {
    return this.form.get("mail");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get password() {
    return this.form.get("password");
  }
  get phoneNumber() {
    return this.form.get("phoneNumber");
  }
  get description() {
    return this.form.get("description");
  }
  get hobbies() {
    return this.form.get("hobbies");
  }
  get dni() {
    return this.form.get("dni");
  }
  get address() {
    return this.form.get("address");
  }


}
