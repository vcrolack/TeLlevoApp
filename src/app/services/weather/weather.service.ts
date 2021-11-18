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
  infoLocation;
  infoWeather;

  constructor(
    private http: HttpClient,
  ) { }

  async getLocation () {
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
          this.infoLocation = data;
          if (this.infoLocation) {
            accept(this.infoLocation)
          } else {
            reject(console.log('ERROR DESCONOCIDO'))
          }
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  async getWeather() {
    var infoLocation = await this.getLocation();
    console.log(infoLocation)
    var nameLocation = infoLocation[0].title;
    var whereOnEarthId = infoLocation[0].woeid;
    
    return new Promise((accept, reject) => {
      const urlTempApi = `https://www.metaweather.com/api/location/${whereOnEarthId}/`;
      var dataWeather = {
        timeInUrZone: 0,
        nameAbbrWeather: '',
        nameWeather: ''
      };
      this.http.get(urlTempApi).subscribe(
        (data) => {
          this.infoWeather = data;
          if (this.infoWeather) {
            console.log(this.infoWeather)
            dataWeather.timeInUrZone = this.infoWeather.consolidated_weather[1].the_temp.toFixed(1);
            dataWeather.nameAbbrWeather = this.infoWeather.consolidated_weather[1].weather_state_abbr;
            dataWeather.nameWeather = this.infoWeather.consolidated_weather[1].weather_state_name;
            console.log(dataWeather)
            //translate the weather
            const arrWeatherNames = ["Snow", "Sleet", "Hail", "Thunderstorm", "Heavy Rain", "Light Rain", "Showers", "Heavy Cloud", "Light Cloud", "Clear"];
            const arrWeatherNamesEs = ["nieve", "Aguanieve", "Granizo", "Tormenta", "Lluvia pesada", "Lluvia ligera", "Chubascos", "Nubes pesadas", "Nublado","Despejado"];
            
            if (arrWeatherNames.includes(dataWeather.nameWeather)) {
              const indexOfWeatherNames = arrWeatherNames.indexOf(dataWeather.nameWeather);
              const weatherNameEs = arrWeatherNamesEs[indexOfWeatherNames];
              dataWeather.nameWeather = weatherNameEs;
              console.log(dataWeather)
            }
            accept(dataWeather)
          } else {
            reject('ERROR DESCONOCIDO')
          }
        },
        (error) => {
          console.log(error)
        }
      )
    })
    
  }



}
