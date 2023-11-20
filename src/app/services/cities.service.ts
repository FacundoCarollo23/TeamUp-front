import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/assets/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private urlApi = Environment.api
  private apiKey = 'QUYwQWREc1Bhdk9Ja2V0U282bndzSFdGeERWQ1oxNURzYm9xdzdFZA==';

  constructor(private http : HttpClient) { }

  getCities(data: string) {
    const headers = new HttpHeaders({
      'X-CSCAPI-KEY': this.apiKey,
    });

    const requestOptions = {
      headers: headers,
    };

    // Agregamos las opciones al request
    return this.http.get(this.urlApi + data + '/cities', requestOptions);
  }

  
}
