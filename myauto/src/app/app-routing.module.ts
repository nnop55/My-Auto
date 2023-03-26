import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddCarComponent } from './components/cars/add-car/add-car.component';
import { CarByIdComponent } from './components/cars/car-by-id/car-by-id.component';
import { CarsPageComponent } from './components/cars/cars-page/cars-page.component';
import { CarsComponent } from './components/cars/cars.component';
import { EditCarComponent } from './components/cars/edit-car/edit-car.component';
import { FilterCarsComponent } from './components/cars/filter-cars/filter-cars.component';

const routes: Routes = [
  {
    path: '', component: CarsComponent, children: [
      { path: '', component: FilterCarsComponent },
      { path: 'add-car', component: AddCarComponent },
      { path: 'cars', component: CarsPageComponent },
      { path: 'edit-car/:id', component: EditCarComponent },
      { path: 'car/:id', component: CarByIdComponent },
    ]
  },
  {
    path: 'user', children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
