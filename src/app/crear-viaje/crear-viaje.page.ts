import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RoutesService } from '../services/routes/routes.service';


@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  routeForm: FormGroup;
  errorMessage: string = '';

  validation_messages = {

  }

  constructor(
    private formBuilder: FormBuilder,
    private NavController: NavController,
    private storage: Storage,
    private loadingController: LoadingController,
    private routeService: RoutesService
  ) {
    this.storage.create();
    this.routeForm = this.formBuilder.group({
      campus: new FormControl("", Validators.compose([
        Validators.required
      ])
      ),
      destiny: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])
      ),
      rate: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit() {
  }

  async newRoute(dataRoute) {
    let userData = await this.storage.get('userData');
    let id = (userData['users'].id);
    dataRoute['user_id']= id;
    console.log(dataRoute)
    this.routeService.newRoute(dataRoute);
    this.NavController.navigateForward("home-driver")
  }

  cancelRoute(): void {
    this.NavController.navigateForward("home-driver")
  }

}
