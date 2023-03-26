import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, share, Subscription, timer } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarInfo } from 'src/app/models/carInfo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  carItem: Car = new Car();

  disableBtn: boolean = true;

  user: any;
  uid: string = "";

  carId: string = '';

  carInfoItem: CarInfo = new CarInfo();
  showButton: boolean = false;

  rxTime: any;
  subscription!: Subscription;

  constructor(private _firebase: FirebaseService,
    private router: Router,
    private datePipe: DatePipe,
    public _shared: SharedService) { }

  ngOnInit(): void {
    this.checkUser();
    this.getUploadedDate();
  }

  checkUser() {                                  //Chek user data
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }

  onSelect(e: any) {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.carItem.images.push(events.target.result)
          if (this.carItem.images.length > 9) {
            this.carItem.images.splice(9, this.carItem.images.length - 9);
          }
        }
      }
    }

    this.validation(e.target.files)
  }

  validation(imageLength: any = 0) {
    if (this.carItem.fuelConsumptionCity != undefined &&
      this.carItem.fuelConsumptionHighway != undefined &&
      this.carItem.price != undefined &&
      this.carItem.year != undefined &&
      this.carItem.fuelType != undefined &&
      imageLength.length > 0 &&
      this.carItem.manufacturer != undefined &&
      this.carItem.model != undefined &&
      this.carItem.type != undefined &&
      this.carItem.place != undefined &&
      this.carItem.engine != undefined &&
      this.carItem.transsimission != undefined) {
      this.disableBtn = false;
    } else {
      this.disableBtn = true
    }
  }

  addCar() {
    this.createCarData();
    this.carItem = new Car();
    this.router.navigate(['/cars'])
  }

  getUploadedDate() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time: any) => {
        this.rxTime = this.datePipe.transform(time, 'YYYY-MM-dd')
      });
  }


  createCarData() {
    const postData: Car = {
      uid: "",
      manufacturer: this.carItem.manufacturer,
      model: this.carItem.model,
      price: this.carItem.price,
      type: this.carItem.type,
      place: this.carItem.place,
      transsimission: this.carItem.transsimission,
      engine: this.carItem.engine,
      year: this.carItem.year,
      images: this.carItem.images,
      fuelType: this.carItem.fuelType,
      fuelConsumptionHighway: this.carItem.fuelConsumptionHighway,
      fuelConsumptionCity: this.carItem.fuelConsumptionCity,
      user_id: this.user.uid,
      favoritesBtn: this.carItem.favoritesBtn,
      uploadedDate: this.rxTime
    }

    this.uid = this._firebase.createCarData(postData)
  }

}
