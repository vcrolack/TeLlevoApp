import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../services/routes/routes.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { CarService } from '../services/car/car.service';

@Component({
  selector: 'app-your-car',
  templateUrl: './your-car.page.html',
  styleUrls: ['./your-car.page.scss'],
})
export class YourCarPage implements OnInit {

  user_id;
  dataCar;
  vehicle;

  constructor(
    private routeService: RoutesService,
    private storage: Storage,
    private navController: NavController,
    private car: CarService
  ) { 
    this.storage.create();

  }

  async ngOnInit() {
    await this.getCar();
  }

  async getCar() {
    this.user_id = await this.routeService.getUserId();
    this.dataCar = await this.car.getCar(this.user_id);
    this.vehicle =  this.dataCar[0]
    return this.vehicle
  }

  goBack() {
    this.navController.back();
  }

}
