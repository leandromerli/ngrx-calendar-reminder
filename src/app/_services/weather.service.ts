import { Injectable, Inject } from '@angular/core';
//import { WEATHER_LIST } from './weather.data';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {
  }


  getWeatheritemsbyCity(cityName: string): Observable<any> {
    
    return this.http.get(
      environment.openWeather.url +
      'weather?q=' + cityName +
      '&appid=' + environment.openWeather.apiKey 
      //'&units=' + environment.units
    )
  }//forecast/daily?q=London&mode=xml&units=metric&cnt=7

  getWeatherForecast(cityName: string): Observable<any> {
    return this.http.get(
      environment.openWeather.url +
      'forecast5?q=' + cityName +
      '&appid=' + environment.openWeather.apiKey 
    //  '&units=' + environment.units
    );
      //.catch(this.handleError);
  }

  private extractData(res: any) {
    let body = res.json();
    return body.list || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}