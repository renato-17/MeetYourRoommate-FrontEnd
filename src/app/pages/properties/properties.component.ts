import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Property} from '../../models/property';
import {PropertiesService} from '../../services/properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertyForm', { static: false })
  propertyForm: NgForm;
  propertyData: Property;
  lessorId: number;
  lessorIdP: number;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'address', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: PropertiesService, private router: Router, private route: ActivatedRoute) {
    this.propertyData = {} as Property;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.lessorId = Number(this.route.params.subscribe( params => {
      if (params.lessorId) {
        const id = params.lessorId;
        console.log('id', id);
        this.lessorIdP = id;
        this.getAllProperties(id);
        return id;
      } else {
        return 0;
      }
    }));
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
  getAllProperties(id): void {
    this.httpDataService.getListPropertyByLessorId(id).subscribe((response: any) => {
      if (!response){
        return;
      }
      this.dataSource = new MatTableDataSource(response.content);
    });
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.propertyForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteProperty(this.lessorIdP, id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Property) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addProperty(): void {
    const newProperty = {address: this.propertyData.address, description: this.propertyData.description};
    this.httpDataService.createProperty(this.lessorIdP, newProperty).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateProperty(): void {
    this.httpDataService.updateProperty(this.lessorIdP, this.propertyData.id, this.propertyData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Property) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.propertyForm.form.valid) {
      if (this.isEditMode) {
        this.updateProperty();
      } else {
        this.addProperty();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddProperty(): void {
    this.router.navigate([`/lessors/${this.lessorIdP}/properties/new`]).then(() => null);
  }
  navigateToEditProperty(propertyId): void {
    this.router.navigate([`/lessors/${this.lessorIdP}/properties/${propertyId}`]).then(() => null);
  }
}
