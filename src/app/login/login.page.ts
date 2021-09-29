import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  }


  constructor(
    private formBuilder: FormBuilder
  ) {
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

  ngOnInit() {
  }

  loginUser(credentials) {
    console.log(credentials);
  }

}
