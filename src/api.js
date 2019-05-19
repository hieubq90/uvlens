import axios from 'axios';

const APIKEY = 'b4d487de-8987-4851-b61b-d1f6c870718a';

export default class ApiService {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  changeLocation(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  getCurrentUV() {
    const url = `https://api.uvlens.com/api/CurrentConditions/Sensor?longitude=${this.lng}&latitude=${this.lat}&skinType=0&key=${APIKEY}`;
    return axios.get(url)
      .then((response) => {
        console.log('getCurrentUV', response);
        return response.data;
      })
      .catch((err) => {
        console.log('getCurrentUV | err = ', err);
      });
  }

  getCurrentWeather() {
    const url = `https://api.uvlens.com/api/CurrentConditions/Weather?longitude=${this.lng}&latitude=${this.lat}&skinType=0&key=${APIKEY}`;
    return axios.get(url)
      .then((response) => {
        console.log('getCurrentWeather', response);
        return response.data;
      })
      .catch((err) => {
        console.log('getCurrentWeather | err = ', err);
      });
  }

  getDailyUV() {
    const url = `https://api.uvlens.com/api/Forecast?longitude=${this.lng}&latitude=${this.lat}&skinType=0&key=${APIKEY}`;
    return axios.get(url)
      .then((response) => {
        console.log('getDailyUV', response);
        return response.data;
      })
      .catch((err) => {
        console.log('getDailyUV | err = ', err);
      });
  }

  getDailyWeather() {
    const url = `https://api.uvlens.com/api/Forecast/WeatherForecast?longitude=${this.lng}&latitude=${this.lat}&skinType=0&key=${APIKEY}`;
    return axios.get(url)
      .then((response) => {
        console.log('getDailyWeather', response);
        return response.data;
      })
      .catch((err) => {
        console.log('getDailyWeather | err = ', err);
      });
  }
}
