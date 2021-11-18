import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate/authenticate.service';
import { LoadingController, NavController } from '@ionic/angular';
import { WeatherService } from '../services/weather/weather.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = {};
  weatherInfo = {};

  constructor(
    private storage: Storage,
    private authService: AuthenticateService,
    private loadingController: LoadingController,
    private weatherService: WeatherService,

  ) {
    this.userDataSession();
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
    console.log(userInfo)
    return userInfo
  }
  logout () {
    this.presentLoading();
    this.authService.logout();
  }

  async getWeather() {
    console.log(this.weatherService.getWeather());
    this.weatherInfo = await this.weatherService.getWeather();
    console.log(this.weatherInfo)
  }

}
