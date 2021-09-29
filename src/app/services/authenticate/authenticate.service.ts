import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credential) {
    return new Promise((accept, reject) => {
      if(credential.username == "rolack" && credential.password == "12345") {
        accept("Login correcto");
      } else {
        reject("Login incorrecto")
      }
    })
  }
}
