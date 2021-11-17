import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  datosGuardados;
  response;

  constructor(
    private http: HttpClient
  ) { }

/*   loginUser(credential) {
    return new Promise((accept, reject) => {
      if(credential.username == "rolack" && credential.password == "12345") {
        accept("Login correcto");
      } else {
        reject("Login incorrecto")
      }
    })
  }  */

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
  readRequest(data) {
    data.json().then(data => {
      return data
    })
  }
  
/*   loginUser(credentials) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `http://localhost:8000/api/users/${credentials.username}/${credentials.password}/`
      this.http.get(apiURL)
      .toPromise()
      .then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg)
        }
      )
    })
    //return this.http.get(`http://localhost:8000/api/users/${credentials.username}/${credentials.password}/`);
    return promise
  } */

}

//nota para no perder el hilo: el logueo por medio de la api funciona correctamente