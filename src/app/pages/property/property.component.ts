import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Property} from '../../models/property';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {PropertiesService} from '../../services/properties.service';

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
  propertyData: Property = new Property();
  defaultProperty = { id: 0, address: '', description: ''};
  constructor(private httpDataService: PropertiesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveProperty(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetProperty();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToProperties(): void {
    this.router.navigate(['/properties']);
  }
  resetProperty(): void {
    this.propertyData = this.defaultProperty;
  }
  retrieveProperty(id): void {
    this.httpDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        console.log(response);
        console.log(this.propertyData);
      });
  }
  addProperty(): void {
    const newProperty = {address: this.propertyData.address, description: this.propertyData.description};
    this.httpDataService.createProperty(newProperty)
      .subscribe(() => {
        this.navigateToProperties();
      });
  }
  cancelEdit(): void {
    this.navigateToProperties();
  }

  updateProperty(): void {
    this.httpDataService.updateProperty(this.propertyData.id, this.propertyData as Property);
    this.navigateToProperties();
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
