import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Ad} from '../../models/ads';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {AdService} from '../../services/ad.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  @ViewChild('adForm', { static: false })
  adForm: NgForm;
  adData: Ad;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'viewsNumber', 'likesNumber'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: AdService, private router: Router) {
    this.adData = {} as Ad;
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllAds();
  }
  navigateToAds(): void {
    this.router.navigate(['/ads']);
  }
  retrieveAd(id): void {
    this.httpDataService.getItem(id)
      .subscribe((response: Ad) => {
        this.adData = {} as Ad;
        this.adData = _.cloneDeep(response);
        console.log(response);
        console.log(this.adData);
      });
  }
  getAllAds(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      if (!response){
        return;
      }
      this.dataSource = new MatTableDataSource(response.content);
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
