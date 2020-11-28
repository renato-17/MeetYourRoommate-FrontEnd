import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Team} from '../../models/team';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {TeamService} from '../../services/team.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('teamForm', { static: false})
  teamForm: NgForm;
  teamId: number;
  teamId2: string;
  teamData: Team = new Team();
  dataSource = new MatTableDataSource();
  dataSourceTask = new MatTableDataSource();
  taskData = { description: ''};
  StudentsNames = [];
  TaskS = [];
  NamesArray = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  defaultTeam = { id: 0, name: ''};
  constructor(private  httpDataService: TeamService, private router: Router, private route: ActivatedRoute, private TaskService: TaskService) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSourceTask.sort = this.sort;
    this.teamId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        this.retrieveTeam(id);
        return id;
      } else {
        this.resetTeam();
        return 0;
      }
    }));
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        console.log('response', response);
        console.log('data', this.teamData);
        this.teamId2 = id;
        this.GetListStudent(id);
        this.GetTasks(id);
      });
  }
  GetTasks(id): void {
    this.TaskService.getList(id)
      .subscribe((response: any) => {
        if (!response){
          return;
        }
        this.dataSourceTask = new MatTableDataSource(response.content);
        this.TaskS = this.dataSourceTask.filteredData;
        console.log('taskss', this.dataSourceTask);
        console.log('taskss123231', this.TaskS);
      });
  }
  GetListStudent(id): void {
    this.httpDataService.getListStudent(id)
      .subscribe((response: any) => {
        if (!response){
          return;
        }
        this.dataSource = new MatTableDataSource(response.content);
        this.StudentsNames = this.dataSource.filteredData;
        this.StudentsNames.forEach((a) => {
          this.NamesArray.push(a.firstName);
        });
        console.log('estudiantes', this.dataSource);
        console.log('namess', this.StudentsNames);
      });
  }
  addTask(): void {
    this.TaskService.createItem(this.teamId2, this.taskData)
      .subscribe(() => {
        this.refreshList();
      });
  }
  addTeam(): void {
    const newTeam = {name: this.teamData.name};
    this.httpDataService.createItem(newTeam)
      .subscribe(() => {
        this.navigateToTeam();
      });
    this.refreshList();
  }
  checkTask(id): void {
    this.TaskService.patchItem(this.teamId2, id)
      .subscribe(() => {
      });
    this.refreshList();
  }
  refreshList(): void {
    this.teamId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        this.httpDataService.getItem(id)
          .subscribe((response: Team) => {
            this.GetTasks(id);
            this.taskData.description = '';
          });
        return id;
      } else {
        this.resetTeam();
        return 0;
      }
    }));
  }
  deleteTask(id): void {
    console.log(this.teamId2);
    console.log(id.toString());
    this.TaskService.deleteItem(this.teamId2, id)
      .subscribe(() => {
      });
    this.refreshList();
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
