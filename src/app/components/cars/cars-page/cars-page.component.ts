import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css'],
  animations: [
    trigger('toggle', [
      state('USD', style({
        backgroundColor: 'green',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px'
      })),
      state('GEL', style({
        backgroundColor: 'green',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px'
      })),
      transition('USD <=> GEL', [
        style({
          transform: 'rotateY(180deg)'
        }),
        animate('0.5s')
      ])
    ])
  ]
})
export class CarsPageComponent implements OnInit {
  routeParams: any = new Object();

  carData: any[] = [];
  filteredData: any = [];

  isToggled: boolean = false;
  usdOrGel: string = '$';

  constructor(private _firebase: FirebaseService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarData();
    this.getRouteParams();
  }

  getRouteParams() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.routeParams = params;
      console.log(this.routeParams)
    })
  }

  toggleButton() {
    this.isToggled = !this.isToggled
    if (!this.isToggled) {
      this.usdOrGel = '$';
      this.carData.forEach((item: any) => {
        item.price = item.price / 2.59;
      })
    } else {
      this.usdOrGel = '₾';
      this.carData.forEach((item: any) => {
        item.price = item.price * 2.59;
      })
    }
  }

  getCarData() {
    this._firebase.getDataByDocumentName('car-data').valueChanges().subscribe((res: any) => {

      if (Object.keys(this.routeParams).length === 0) {
        this.carData = res;
      } else {
        const filteredData = this.customFilter(res, [
          (item: any) =>
            !this.routeParams.manufacturer ||
            item.manufacturer === this.routeParams.manufacturer,
          (item: any) =>
            !this.routeParams.model ||
            item.model === this.routeParams.model,
          (item: any) =>
            !this.routeParams.type ||
            item.type === this.routeParams.type,
          (item: any) =>
            !this.routeParams.fuelType
            || item.fuelType === this.routeParams.fuelType,
          (item: any) =>
            !this.routeParams.priceFrom
            || item.price >= this.routeParams.priceFrom,
          (item: any) =>
            !this.routeParams.priceTo
            || item.price <= this.routeParams.priceTo,
        ]);
        this.carData = filteredData;
        console.log(this.carData);
      }
    })
  }

  customFilter(array: any, conditions: any) {
    return array.filter((item: any) => {
      return conditions.every((condition: any) => {
        return condition(item);
      });
    });
  }

}
