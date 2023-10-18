/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {

  private appConfig: any;

  private http: HttpClient;

  constructor(
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
}

  loadAppConfig() {
    return this.http.get('assets/config.json')
      .toPromise()
      .then(data => {
  
        this.appConfig = data;
        
      });
  }

 
  get apiBaseUrl() {

    if (!this.appConfig) {
      throw Error('Error en el archivo de configuracion de ruta');
    }

    return this.appConfig.apiBaseUrl;
  }
  



  
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}

