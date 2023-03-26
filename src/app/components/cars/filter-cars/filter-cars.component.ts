import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarInfo } from 'src/app/models/carInfo.model';
import { FilterCar } from 'src/app/models/filter-car.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-filter-cars',
  templateUrl: './filter-cars.component.html',
  styleUrls: ['./filter-cars.component.css']
})
export class FilterCarsComponent implements OnInit {
  carInfoItem: CarInfo = new CarInfo();
  carItem: FilterCar = new FilterCar();


  constructor(public _shared: SharedService,
    private router: Router) { }

  ngOnInit(): void {
  }

  filterCarsBtn() {
    console.log(this.carItem);
    this.router.navigate(
      ['/cars'],
      {
        queryParams: {
          manufacturer: this.carItem.manufacturer,
          model: this.carItem.model,
          type: this.carItem.type,
          fuelType: this.carItem.fuelType,
          priceFrom: this.carItem.minPrice,
          priceTo: this.carItem.maxPrice
        }
      }
    );
    this.carItem = new FilterCar();
  }

}
