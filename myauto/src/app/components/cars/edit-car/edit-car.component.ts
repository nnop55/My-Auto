import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarInfo } from 'src/app/models/carInfo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  currentCar: any;

  uid: string = "";

  carInfoItem: CarInfo = new CarInfo();
  showButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private _firebase: FirebaseService,
    public _shared: SharedService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCarById();
  }

  onSelect(e: any) {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.currentCar.images.push(events.target.result)
          if (this.currentCar.images.length > 9) {
            this.currentCar.images.splice(9, this.currentCar.images.length - 9);
          }
        }
      }
    }
  }

  getCarById() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.uid = params['id'];
      this._firebase.getDataById('car-data', this.uid).valueChanges().subscribe((res: any) => {
        this.currentCar = res;
        console.log(this.currentCar)
      })
    })
  }

  updateCarData() {
    const postData: Car = {
      uid: this.currentCar.uid,
      manufacturer: this.currentCar.manufacturer,
      model: this.currentCar.model,
      price: this.currentCar.price,
      type: this.currentCar.type,
      place: this.currentCar.place,
      transsimission: this.currentCar.transsimission,
      engine: this.currentCar.engine,
      year: this.currentCar.year,
      images: this.currentCar.images,
      fuelType: this.currentCar.fuelType,
      fuelConsumptionHighway: this.currentCar.fuelConsumptionHighway,
      fuelConsumptionCity: this.currentCar.fuelConsumptionCity,
      user_id: this.currentCar.user_id,
      favoritesBtn: this.currentCar.favoritesBtn,
      uploadedDate: this.currentCar.uploadedDate
    }

    this._firebase.setDataByDocumentName('car-data', this.uid).update(postData)
      .then(() => this.router.navigate(['/user/profile']))

  }

}
