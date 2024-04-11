import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../interface/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  getWeather(place: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.baseUrl}${place}/EN`, {
      headers: new HttpHeaders()
        .set('X-RapidAPI-Key', environment.key)
        .set('X-RapidAPI-Host', environment.host)
    })
  }


}
