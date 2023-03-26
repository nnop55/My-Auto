import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  carData: any[] = [];

  constructor(private _firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {                         //Get user data
    this._firebase.user$.subscribe((user: any) => {
      this.user = user;
      console.log(this.user);
      this.getCarData(this.user);
    })
  }

  getCarData(user: any = '') {
    this._firebase.getDataByDocumentName('car-data').valueChanges().subscribe((res: any) => {
      res.forEach((car: any) => {
        if (res && car.uid.length > 0 && car.user_id == user.uid) {
          this.carData.push(car);
          console.log(this.carData)
        }
      })
    })
  }

  deleteCar(car: any) {
    Swal.fire({
      title: 'Do you want to delete this car?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your car succesfully deleted', 'success');
        this._firebase.deleteDataByDocumentName('car-data', car.uid);
        this.getCarData();
      }
    })
  }

}
