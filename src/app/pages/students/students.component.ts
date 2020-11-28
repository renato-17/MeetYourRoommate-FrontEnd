import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Student } from '../../models/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../../services/student.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;
  studentData: Student;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'birthdate', 'address', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: StudentService, private router: Router, private formBuilder: FormBuilder) {
    this.studentData = {} as Student;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllStudents();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllStudents(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      if (!response){
        return;
      }
      this.dataSource = new MatTableDataSource(response.content);
    });
  }
  addStudent(): void {
    const newStudent = {firstName: this.studentData.firstName, lastName: this.studentData.lastName, address: this.studentData.address};
    this.httpDataService.createItem(newStudent).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateStudent(): void {
    this.httpDataService.updateItem(this.studentData.id, this.studentData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Student) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.studentForm.form.valid) {
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }
  navigateToAddStudent(): void {
    this.router.navigate(['/students/new']).then(() => null);
  }
  navigateToEditStudent(studentId): void {
    this.router.navigate([`/students/${studentId}`]).then(() => null);
  }
  navigateToStudentProfile(studentId): void {
    this.router.navigate([`/students/${studentId}`]).then(() => null);
  }
}
