import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userLoggedIn: boolean = false;

  constructor() { }


  getModelOptions(carInfoItem: any, car: any) {
    switch (car.manufacturer) {
      case 'Toyota':
        return carInfoItem.toyotaModels;
      case 'Honda':
        return carInfoItem.hondaModels;
      case 'Nissan':
        return carInfoItem.nissanModels;
      case 'Ford':
        return carInfoItem.fordModels;
      case 'Chevrolet':
        return carInfoItem.chevroletModels;
      case 'Volkswagen':
        return carInfoItem.vwModels;
      case 'BMW':
        return carInfoItem.bmwModels;
      case 'Mercedes-Benz':
        return carInfoItem.mercedesModels;
      default:
        return [];
    }
  }

  deletePhoto(index: any, currentCar: any) {
    currentCar.images.splice(index, 1);
  }


}
