import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { CarsComponent } from './components/cars/cars.component';
import { FilterCarsComponent } from './components/cars/filter-cars/filter-cars.component';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';


import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { AddCarComponent } from './components/cars/add-car/add-car.component';
import { CarsPageComponent } from './components/cars/cars-page/cars-page.component';
import { EditCarComponent } from './components/cars/edit-car/edit-car.component';
import { CarByIdComponent } from './components/cars/car-by-id/car-by-id.component';
import { DatePipe } from '@angular/common';


const materialModules = [
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatDividerModule
];

const firebaseModules = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    FilterCarsComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AddCarComponent,
    CarsPageComponent,
    EditCarComponent,
    CarByIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    materialModules,
    firebaseModules,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
