import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes/routes.service';
import { AlertController, NavController } from '@ionic/angular';
import { CarService } from '../services/car/car.service';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  routes;
  cars;
  carsAndRoutes;
  countPassengers;

  constructor(
    private routeService: RoutesService,
    private navController: NavController,
    private car: CarService,
    private alertController: AlertController
  ) {
    
  }

  async ngOnInit() {
    await this.getAllRoutes();
  }

  async getAllRoutes() {
    this.routes = await this.routeService.getAllRoutes();
    this.cars = this.routes[6]
    console.log(this.cars)
    this.carsAndRoutes = [this.routes, this.cars]
    console.log(this.cars[0].capacity)
    this.countPassengers = this.cars[0].capacity;
    return this.carsAndRoutes
  }

  /* makeSuscription(route_id, user_id) {
    this.car.makeSuscription(route_id, user_id)
  } */

  updatePassengers(dataRoute) {
    let route_id = dataRoute.id;
    
    
    if  (dataRoute.passengers_suscribed < 4){
      let updatePassengers = dataRoute.passengers_suscribed++;
      console.log(dataRoute)
      this.routeService.updatePassengers(route_id, dataRoute)
    } else {
      this.presentAlert();
    }
  }

  goBack():void {
    this.navController.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'OJO',
      subHeader: 'Capacidad superada',
      message: 'Este viaje cuenta con todos los asientos ocupados.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }









  doRefresh(event) {
    setTimeout(() => {
      this.getAllRoutes();
      event.target.complete();
    }, 1500)
  }

}
