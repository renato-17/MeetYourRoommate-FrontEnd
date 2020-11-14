import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {Property} from '../../models/property';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertyForm', { static: false })
  propertyForm: NgForm;
  propertyData: Property;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'address', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataService, private router: Router) {
    this.propertyData = {} as Property;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllProperties();
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
  getAllProperties(): void {
    this.httpDataService.getPropertyList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.propertyForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteProperty(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Property) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addProperty(): void {
    const newProperty = {address: this.propertyData.address, description: this.propertyData.description};
    this.httpDataService.createProperty(newProperty).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateProperty(): void {
    this.httpDataService.updateProperty(this.propertyData.id, this.propertyData)
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
    this.router.navigate(['/properties/new']).then(() => null);
  }
  navigateToEditProperty(propertyId): void {
    this.router.navigate([`/properties/${propertyId}`]).then(() => null);
  }
}
