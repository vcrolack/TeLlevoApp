import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticateService } from '../services/authenticate/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    username: [
      {type: "required", message: "El nombre de usuario es obligatorio."},
      {type: "minLength", message: "El nombre de usuario es de mínimo 5 letras."},
      {type: "maxLength", message: "El nombre de usuario es de máximo 30 letras."}
    ],
    password: [
      {type: "required", message: "La contraseña es obligatoria."},
      {type:"minLength", message: "La contraseña es de mínimo 5 caracteres."},
      {type: "maxLength", message: "La contraseña es de máxiomo 30 caracteres."}
    ]
  };

  errorMessage: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navControler: NavController,
    private storage: Storage,
    private loadingController: LoadingController,
  ) {
    this.storage.create();
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])
      ),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])
      )
    }
    )
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Cargando...",
      duration: 2000
    });

    await loading.present();

    const {role, data} = await loading.onDidDismiss();
  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials)
    .then(res => {
      this.errorMessage="";
      this.storage.set('isUserLoggedIn', true);
      this.navControler.navigateForward("home");
    })
    .catch(err => this.errorMessage = err);
  }
}
