import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Team} from '../../models/team';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpDataService} from '../../services/http-data.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, AfterViewInit {
  @ViewChild('teamForm', { static: false})
  teamForm: NgForm;
  teamData: Team;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private httpDataService: TeamService, private router: Router) {
    this.teamData = {} as Team;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllTeams();
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllTeams(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      if (!response) {
        return;
      }
      this.dataSource = new MatTableDataSource(response.content);
    });
  }
  addTeam(): void {
    // const newTeam = { name: this.teamData.name};
    // this.httpDataService.createItem(newTeam).subscribe((response: any) => {
    //  this.dataSource.data.push({...response});
    //  this.dataSource.data = this.dataSource.data.map(o => o);
    // });
  }
  onSubmit(): void {
    if (this.teamForm.form.valid) {
        this.addTeam();
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddTeam(): void {
    this.router.navigate(['/teams/new']).then(() => null);
  }
}
