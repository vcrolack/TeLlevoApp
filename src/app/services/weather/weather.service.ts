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
  weatherImg;
  dataWeather = {
    namePlace: '',
    timeInUrZone: 0,
    nameAbbrWeather: '',
    nameWeather: '',
    urlImage: '',
    state: false
  };

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
    //console.log(infoLocation)
    var nameLocation = infoLocation[0].title;
    var whereOnEarthId = infoLocation[0].woeid;
    this.dataWeather.namePlace = nameLocation
    /* var dataWeather = {
      timeInUrZone: 0,
      nameAbbrWeather: '',
      nameWeather: '',
      urlImage: ''
    }; */
    
    
    return new Promise((accept, reject) => {
      const urlTempApi = `https://www.metaweather.com/api/location/${whereOnEarthId}/`;
      console.log(urlTempApi)
      
      this.http.get(urlTempApi).subscribe(
        (data) => {
          this.infoWeather = data;
          if (this.infoWeather) {
            //console.log(this.infoWeather)
            this.dataWeather.timeInUrZone = this.infoWeather.consolidated_weather[1].the_temp.toFixed(1);
            this.dataWeather.nameAbbrWeather = this.infoWeather.consolidated_weather[1].weather_state_abbr;
            this.dataWeather.nameWeather = this.infoWeather.consolidated_weather[1].weather_state_name;
            this.dataWeather.urlImage =`https://www.metaweather.com/static/img/weather/${this.dataWeather.nameAbbrWeather}.svg`;
            //console.log(dataWeather)
            //translate the weather
            const arrWeatherNames = ["Snow", "Sleet", "Hail", "Thunderstorm", "Heavy Rain", "Light Rain", "Showers", "Heavy Cloud", "Light Cloud", "Clear"];
            const arrWeatherNamesEs = ["nieve", "Aguanieve", "Granizo", "Tormenta", "Lluvia pesada", "Lluvia ligera", "Chubascos", "Nubes pesadas", "Nublado","Despejado"];
            
            if (arrWeatherNames.includes(this.dataWeather.nameWeather)) {
              const indexOfWeatherNames = arrWeatherNames.indexOf(this.dataWeather.nameWeather);
              const weatherNameEs = arrWeatherNamesEs[indexOfWeatherNames];
              this.dataWeather.nameWeather = weatherNameEs;
              this.dataWeather.state = true;
              //console.log(dataWeather)
            }
            accept(this.dataWeather)
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
