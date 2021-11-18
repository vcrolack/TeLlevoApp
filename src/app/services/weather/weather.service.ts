import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Geolocation} from '@capacitor/geolocation'
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  latitude: number;
  longitude: number;

  constructor(
    private http: HttpClient,
  ) { }

  async getWeather () {
    const getCoordinates = await Geolocation.getCurrentPosition();
    const saveCoordinates = {
      latitude: 0,
      longitude: 0,
    }
    this.latitude = getCoordinates.coords.latitude;
    this.longitude = getCoordinates.coords.longitude;
    saveCoordinates.latitude = this.latitude;
    saveCoordinates.longitude = this.longitude;

    //API consulting
    const apiURL = `https://www.metaweather.com/api/location/search/?lattlong=${saveCoordinates.latitude},${saveCoordinates.longitude}`;
    return new Promise((accept, reject) => {
      const apiURL = `https://www.metaweather.com/api/location/search/?lattlong=${saveCoordinates.latitude},${saveCoordinates.longitude}`;
      this.http.get(apiURL).subscribe(
        (data) => {
          console.log(data)
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

}
