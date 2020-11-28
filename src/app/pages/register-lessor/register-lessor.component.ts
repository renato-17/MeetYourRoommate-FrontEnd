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
}
