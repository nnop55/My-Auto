import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _firebase: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.value.password != form.value.confPassword) {
      alert('Password doesn;t match!!')
    } else {
      this._firebase.signUp(form.value, form.value.password);
      this.router.navigate(['']);
    }
  }

}
