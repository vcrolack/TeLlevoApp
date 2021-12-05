import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) { }

  newRoute(dataRoute) {
    return new Promise((accept, reject) => {
      let data = {
        "campus": dataRoute.campus,
        "destiny": dataRoute.destiny,
        "rate": dataRoute.rate,
        "user_id": dataRoute.user_id
      }
      const apiURL =`http://127.0.0.1:8000/api/routes/`
      this.http.post(apiURL, dataRoute).subscribe(
        (data) => {
          accept(console.log("Enviados..."))
        },
        (error) => {
          console.log(error)
        }
      )
    })
  }
}
