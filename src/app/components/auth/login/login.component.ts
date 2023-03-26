import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this._firebase.signIn(form.value.email, form.value.password);
  }

}
