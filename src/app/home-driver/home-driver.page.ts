import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate/authenticate.service';
import { LoadingController, NavController } from '@ionic/angular';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home-driver',
  templateUrl: './home-driver.page.html',
  styleUrls: ['./home-driver.page.scss'],
})
export class HomeDriverPage {

  user = {};
  weatherInfo = {};

  constructor(
    private storage: Storage,
    private authService: AuthenticateService,
    private loadingController: LoadingController,
    private weatherService: WeatherService,
    private navController: NavController

  ) {
    this.storage.create();
    this.userDataSession();
    this.getWeather();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Cargando...",
      duration: 2000
    });

    await loading.present();

    const {role, data} = await loading.onDidDismiss();
  }

  async userDataSession() {
    this.user = await this.storage.get('userData')
    let userInfo = this.user
    //console.log(userInfo)
    return userInfo
  }
  
  logout () {
    this.presentLoading();
    this.authService.logout();
  }

  async getWeather() {
    this.weatherInfo = await this.weatherService.getWeather();
  }

  moveToNewRoute(): void {
    this.navController.navigateForward("crear-viaje");
  }
  moveToRoutesCreated(): void {
    this.navController.navigateForward("routes-created");
  }
  moveToYourCar(): void {
    this.navController.navigateForward("your-car");
  }

}
