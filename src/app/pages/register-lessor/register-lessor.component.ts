import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Lessor} from "../../models/lessor";
import {LessorsService} from "../../services/lessors.service";

@Component({
  selector: 'app-register-lessor',
  templateUrl: './register-lessor.component.html',
  styleUrls: ['./register-lessor.component.css']
})
export class RegisterLessorComponent implements OnInit {
  form: FormGroup;
  lessorData: Lessor;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private httpDataService: LessorsService, private router: Router, private formBuilder: FormBuilder) {
    this.lessorData = {} as Lessor;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      dni: ['', [Validators.required], Validators.minLength(8), Validators.maxLength(8)],
      phoneNumber: ['', [Validators.required], Validators.minLength(9), Validators.maxLength(9)],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required], Validators.minLength(10)],
      premium: [false]
    });
  }

  addLessor(): void {
    const newLessor = {
        mail: this.form.get("mail").value,
        password:  this.form.get("password").value,
        firstName:  this.form.get("firstName").value,
        lastName: this.form.get("lastName").value,
        dni: this.form.get("dni").value,
        phoneNumber:  this.form.get("phoneNumber").value,
        gender:  this.form.get("gender").value,
        birthdate: this.form.get("birthdate").value,
        address:  this.form.get("address").value
      };
    console.log(newLessor);
    this.httpDataService.createItem(newLessor).subscribe(()=>{});
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }
    console.log("Form is valid");
    this.addLessor();
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
  get dni() {
    return this.form.get("dni");
  }
  get address() {
    return this.form.get("address");
  }

}
