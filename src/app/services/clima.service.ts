import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/assets/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private urlApi = Environment.apiClima
  private apiKey = '9898af008c693355031bc44d610070ce';
  URI: string = '';
  
  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`;
  }

  getWeather(cityName: string, countryCode: string) {
    return this.http.get(`${this.URI}${cityName},${countryCode}`);
  }
}
