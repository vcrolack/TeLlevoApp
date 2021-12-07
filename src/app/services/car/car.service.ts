import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/core/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  dataCar;
  dataAllCars;
  aRoute;

  constructor(
    private http: HttpClient
  ) { }

  getCar(user_id) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/vehicles/user/${user_id}/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          this.dataCar = data['vehicle'];
          if (this.dataCar) {
            accept(this.dataCar)
          } else {
            reject(console.log('Ha ocurrido un error'))
          }
        }
      )
    })
  }

  getAllCars() {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/vehicles/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          //console.log(data['vehicles'])
          this.dataAllCars = data['vehicles'];
          if (this.dataAllCars) {
            accept(this.dataAllCars)
          } else {
            reject("Ha ocurrido un error.")
          }
        }
      )
    })
  }

  getRoute(route_id) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/routes/${route_id}`;
      this.http.get(apiURL).subscribe(
        (data) => {
          this.aRoute = data['route'];
          if (this.aRoute) {
            accept(this.aRoute);
          } else {
            console.log("Ha ocurrido un error");
          }
        }
      )
    })
  }
}
