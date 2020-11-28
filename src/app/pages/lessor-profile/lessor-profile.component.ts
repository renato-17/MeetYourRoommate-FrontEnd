import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {Lessor} from '../../models/lessor';
import {Component, OnInit} from '@angular/core';
import {LessorsService} from '../../services/lessors.service';

@Component({
  selector: 'app-lessor-profile',
  templateUrl: './lessor-profile.component.html',
  styleUrls: ['./lessor-profile.component.css']
})
export class LessorProfileComponent implements OnInit {
  lessorId: number;
  lessorIdP: number;
  lessorData: Lessor = new Lessor();
  constructor(private httpDataService: LessorsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lessorId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveLessor(id);
        return id;
      }
    }));
  }
  retrieveLessor(id): void {
    this.httpDataService.getLessorById(id)
      .subscribe((response: Lessor) => {
        this.lessorIdP = id;
        this.lessorData = {} as Lessor;
        this.lessorData = _.cloneDeep(response);
        console.log(response);
        console.log(this.lessorData);
      });
  }
  navigateToMyProperties(): void {
    this.router.navigate([`/lessors/${this.lessorIdP}/properties`]).then(() => null);
  }
}
