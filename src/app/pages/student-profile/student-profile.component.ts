import { Component, OnInit } from '@angular/core';
import {Lessor} from '../../models/lessor';
import {LessorsService} from '../../services/lessors.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentId: number;
  studentData: Student = new Student();
  constructor(private httpDataService: StudentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveLessor(id);
        return id;
      }
    }));
  }
  retrieveLessor(id): void {
    this.httpDataService.getItem(id)
        .subscribe((response: Student) => {
          this.studentData = {} as Student;
          this.studentData = _.cloneDeep(response);
          console.log(response);
          console.log(this.studentData);
        });
  }
}

