import { Component, OnInit } from '@angular/core';
import {Lessor} from '../../models/lessor';
import {LessorsService} from '../../services/lessors.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';
import {Team} from '../../models/team';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentId: number;
  studentTeam: 0;
  teamId: number;
  studentData: Student = new Student();
  Team: Team = new Team();
  constructor(private httpDataService: StudentService, private TeamService: TeamService, private router: Router, private route: ActivatedRoute) { }

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
          this.studentTeam = id;
          this.studentData = {} as Student;
          this.studentData = _.cloneDeep(response);
          console.log(response);
          console.log(this.studentData);
        });
  }
  navigateToTeam(): void{
    console.log('student team', this.studentTeam);
    this.TeamService.getTeamByStudent(this.studentTeam)
      .subscribe((response: Team) => { console.log('response', response);
                                       this.teamId = response.id;
                                       console.log('team id', this.teamId);
                                       this.router.navigate([`/teams/${this.teamId}`]).then(() => null);
      });
  }
}

