import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Car-buy-sell-ng';

  constructor(private _firebase: FirebaseService,
    private _shared: SharedService) { }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    this._firebase.user$.subscribe((user: any) => {
      console.log(user)
      if (user && user.uid.length > 0) {
        this._shared.userLoggedIn = true;
        localStorage.getItem('user');
      }
    })
  }

}


// [  {    "manufacturer": "Toyota",    
//"model": "Camry",    
//"year": 2020,    
//"price": 25000,    
//"images": [      
  //"https://example.com/toyota-camry-2020-image-1.jpg",
  // "https://example.com/toyota-camry-2020-image-2.jpg",
  //  "https://example.com/toyota-camry-2020-image-3.jpg"    ],
//     "type": "Sedan",
//     "fuelType": "Gasoline",
//     "fuelConsumption": {
//       "city": 28,
//       "highway": 39
//     }
//   },
//   {
//     "manufacturer": "Honda",
//     "model": "Civic",
//     "year": 2019,
//     "price": 22000,
//     "images": [
//       "https://example.com/honda-civic-2019-image-1.jpg",
//       "https://example.com/honda-civic-2019-image-2.jpg",
//       "https://example.com/honda-civic-2019-image-3.jpg"
//     ],
//     "type": "Sedan",
//     "fuelType": "Gasoline",
//     "fuelConsumption": {
//       "city": 30,
//       "highway": 38
//     }
//   },
//   {
//     "manufacturer": "Ford",
//     "model": "F-150",
//     "year": 2021,
//     "price": 45000,
//     "images": [
//       "https://example.com/ford-f150-2021-image-1.jpg",
//       "https://example.com/ford-f150-2021-image-2.jpg",
//       "https://example.com/ford-f150-2021-image-3.jpg"
//     ],
//     "type": "Pickup",
//     "fuelType": "Gasoline",
//     "fuelConsumption": {
//       "city": 20,
//       "highway": 25
//     }
//   }
// ]
