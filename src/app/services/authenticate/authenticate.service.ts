import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  datosGuardados;
  response;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) { }

  loginUser(credentials) {
    return new Promise((accept, reject) => {
      let apiURL = `http://localhost:8000/api/users/${credentials.username}/${credentials.password}/`
      this.http.get(apiURL).subscribe(
        (data) => {
          this.datosGuardados = data;
          if (this.datosGuardados.verification_state == 'true'){
            accept(this.datosGuardados)
          } else {
            reject(console.log('re pollo que sos'))
          }
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  logout(): void {
    this.storage.remove('userdata')
    this.storage.set('isUserLoggedIn', false)
    this.router.navigate(['login'])
  }
  

}

//nota para no perder el hilo: el logueo por medio de la api funciona correctamente