import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Team} from '../../models/team';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {TeamsService} from '../../services/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('teamForm', { static: false})
  teamForm: NgForm;
  teamId: number;
  teamData: Team = new Team();
  defaultTeam = { id: 0, name: ''};
  constructor(private  httpDataService: TeamsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveTeam(id);
        return id;
      } else {
        this.resetTeam();
        return 0;
      }
    }));
  }
  navigateToTeam(): void {
    this.router.navigate(['/teams']);
  }
  resetTeam(): void {
    this.teamData = this.defaultTeam;
  }
  retrieveTeam(id): void {
    this.httpDataService.getItem(id)
      .subscribe((response: Team) => {
        this.teamData = {} as Team;
        this.teamData = _.cloneDeep(response);
        console.log(response);
        console.log(this.teamData);
      });
  }
  addTeam(): void {
    const newTeam = {name: this.teamData.name};
    this.httpDataService.createItem(newTeam)
      .subscribe(() => {
        this.navigateToTeam();
      });
  }
  updateTeam(): void {
    this.httpDataService.updateItem(this.teamData.id, this.teamData as Team);
    this.navigateToTeam();
  }
  onSubmit(): void {
    if (this.teamForm.form.valid) {
      console.log(this.teamData);
      this.addTeam();
    } else {
      console.log('Invalid Data');
    }
  }
}
