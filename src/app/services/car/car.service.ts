import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  dataCar;

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
}
