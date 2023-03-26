import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-car-by-id',
  templateUrl: './car-by-id.component.html',
  styleUrls: ['./car-by-id.component.css'],
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
export class CarByIdComponent implements OnInit {
  currentSlide: any = 0;
  currentCar: any;
  showButton: boolean = false;
  user: any;

  isToggled: boolean = false;
  usdOrGel: string = '$';

  showFavoriteBtn: boolean = false;
  toggleFavoriteBtn: string = 'favorite_border'

  constructor(private activatedRoute: ActivatedRoute,
    private _firebase: FirebaseService,
    public _shared: SharedService) { }

  ngOnInit(): void {
    this.checkUser();
    this.getCarById();
  }

  checkUser() {
    this._firebase.user$.subscribe((user: any) => {
      if (user) {
        this.user = user;
        console.log(this.user);
        this.showFavoriteBtn = true;
      }
    })
  }


  addToFavorites(car: any) {
    car.favoritesBtn = !car.favoritesBtn;
    let tmp: any = [];
    if (car.favoritesBtn) {
      tmp.push(car);
      this._firebase.setDataByDocumentName('users', this.user.uid).update({ favorites: tmp });
      console.log(this.user);
      this.toggleFavoriteBtn = 'favorite';
    } else {
      tmp.pop(car);
      this._firebase.setDataByDocumentName('users', this.user.uid).update({ favorites: tmp });
      console.log(this.user);
      this.toggleFavoriteBtn = 'favorite_border';
    }

    this._firebase.setDataByDocumentName('car-data', car.uid).update({ favoritesBtn: car.favoritesBtn });
  }

  getCarById() {
    this.activatedRoute.params.subscribe((params: any) => {
      let uid = params['id'];
      this._firebase.getDataById('car-data', uid).valueChanges().subscribe((res: any) => {
        this.currentCar = res;
        console.log(this.currentCar)
        if (this.currentCar.favoritesBtn) {
          this.toggleFavoriteBtn = 'favorite';
        } else {
          this.toggleFavoriteBtn = 'favorite_border';
        }
      })
    })
  }


  setActiveSlide() {
    const slides = document.querySelectorAll('.slides img');

    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === this.currentSlide) {
        slide.classList.add('active');
      }
    });
  }

  onMouseOver(ind: any) {
    this.currentSlide = ind;
    this.setActiveSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.currentCar.images.length;
    this.setActiveSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.currentCar.images.length) % this.currentCar.images.length;
    this.setActiveSlide();
  }

  toggleButton() {
    this.isToggled = !this.isToggled
    if (!this.isToggled) {
      this.usdOrGel = '$';
      this.currentCar.price = this.currentCar.price / 2.59;
    } else {
      this.usdOrGel = '₾';
      this.currentCar.price = this.currentCar.price * 2.59;

    }
  }

}
