import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgFileShimData} from '@angular/compiler-cli/src/ngtsc/shims/src/expando';
import {NgForm} from '@angular/forms';
import {Student} from '../../models/student';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  studentId: 2;
  studentData: Student = new Student();
  constructor(private httpDataService: StudentService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.retrieveLessor(this.studentId);
  }

  retrieveLessor(id): void {
    this.httpDataService.getItem(2)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
}
