import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Route } from 'src/app/core/models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  savedRoutes = [{
    campus: "",
    destiny: "",
    price: 0,
    user_id: 0
  }];
  aRoute;
  allRoutes;

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

//get a route (stand by)
  getRoute(id) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/routes/${id}/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          console.log(data)
        }
      )
    })
  }

  //for the driver 
  getUsersRoute(user_id) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/routes/user/${user_id}`;
      this.http.get(apiURL).subscribe(
        (data) => {
          this.savedRoutes = data['routes'];
          //console.log(this.savedRoutes['routes'])
          //console.log(this.savedRoutes)

          if (this.savedRoutes) {
            //console.log(this.savedRoutes)
            accept(this.savedRoutes);
          } else {
            reject(console.log("Ha ocurrido un error"))
          }
        }
      )
    })
  }

  updateRoute(route_id, changes: Partial<Route>) {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/routes/${route_id}/`;
      this.http.put(apiURL, changes).subscribe(
        (data) => {
          console.log(data)
        }
      )
    })
  }


  deleteRoute(route_id) {
    return new Promise((accept, reject)=> {
      const apiURL = `http://127.0.0.1:8000/api/routes/${route_id}`;
      this.http.delete(apiURL).subscribe(
        (data) => {
          console.log(data)

        }
      )
    })
  }


  getUserId() {
    return new Promise(async(accept, reject) => {
      let userData = await this.storage.get('userData');
      let user_id = userData['users'].id;
      if (user_id > 0 || user_id != undefined) {
        accept(user_id)
      } else {
        reject(console.log("Algo ha fallado"))
      }
    })
  }

  getAllRoutes() {
    return new Promise((accept, reject) => {
      const apiURL = `http://127.0.0.1:8000/api/routes/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          console.log(data)
          this.allRoutes = data['routes'];
          if (this.allRoutes) {
            accept(this.allRoutes)
          } else {
            reject(console.log("Ha ocurrido un error."))
          }
        }
      )
    })
  }
}
