import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuOpen: boolean = false;

  addBtn: any;

  constructor(private _firebase: FirebaseService,
    public _shared: SharedService) { }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logOut() {
    this._firebase.signOut();
    this.toggleMenu();
  }

  checkUserLoggedIn() {
    this._firebase.user$.subscribe((user: any) => {
      if (user && user.uid.length > 0) {
        this.addBtn = '/add-car'
      } else {
        this.addBtn = '/user/login'
      }
    })
  }

}
