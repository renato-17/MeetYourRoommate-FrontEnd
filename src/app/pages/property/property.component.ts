import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Property} from '../../models/property';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {PropertiesService} from '../../services/properties.service';
import {PropertyDetailService} from '../../services/property-detail.service';
import {PropertyDetail} from '../../models/property-detail';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @ViewChild('propertyForm', { static: false })
  propertyForm: NgForm;
  isEditMode = false;
  propertyId: number;
  lessorId: number;
  propertyData: Property = new Property();
  propertyDetailData: PropertyDetail = new PropertyDetail();
  defaultProperty = { id: 0, address: '', description: ''};
  defaultPropertyDetails = { rooms: 0, bathrooms: 0, squareMeters: 0, kitchens: 0, livingrooms: 0, price: 0};
  constructor(private httpDataService: PropertiesService, private router: Router, private route: ActivatedRoute, private PropertyDetailService: PropertyDetailService) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.params.subscribe( params => {
      if (params.lessorId && params.id) {
        const id = params.id;
        this.lessorId = params.lessorId;
        this.retrieveProperty(id);
        this.isEditMode = true;
        return id;
      } else {
        this.lessorId = params.lessorId;
        this.isEditMode = false;
      }
    }));
  }
  navigateToProperties(): void {
    this.router.navigate([`/lessors/${this.lessorId}/properties`]);
  }
  retrieveProperty(id): void {
    this.httpDataService.getPropertyById(this.lessorId, id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        console.log(response);
        console.log(this.propertyData);
      });
  }
  addProperty(): void {
    const newProperty = {address: this.propertyData.address, description: this.propertyData.description};
    console.log('property', newProperty);
    this.httpDataService.createProperty(this.lessorId, newProperty)
      .subscribe(() => {
        this.navigateToProperties();
      });
  }
  cancelEdit(): void {
    this.navigateToProperties();
  }

  updateProperty(): void {
    console.log('UPDATE', this.propertyData);
    this.httpDataService.updateProperty(this.lessorId, this.propertyData.id, this.propertyData).subscribe(() => {
      this.navigateToProperties();
    });
  }
  onSubmit(): void {
    if (this.propertyForm.form.valid) {
      console.log(this.propertyData);
      if (this.isEditMode) {
        this.updateProperty();
      } else {
        this.addProperty();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
