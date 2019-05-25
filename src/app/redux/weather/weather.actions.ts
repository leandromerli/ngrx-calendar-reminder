import { Action } from '@ngrx/store';
import * as moment from 'moment';

export const GET_WEATHER    = '[WEATHER] get';
export const ADD_WEATHER    = '[WEATHER] add';
export const WEATHER_ERROR = '[WEATHER] error';


export class AddWeatherAction implements Action {
  readonly type = ADD_WEATHER;
  

  constructor(
    public payload: { city:string; 
     weatherData:any; }
  ) {
    
  }
}
export class GetWeatherAction implements Action {
  readonly type = GET_WEATHER;
  

  constructor(
    public payload: { city:string; }
  ) {
    
  }
}


export class WeatherErrorAction implements Action {
  readonly type = WEATHER_ERROR;

  constructor(public payload: {  }
  ) {}
}



export type WeatherActionType =
AddWeatherAction |
WeatherErrorAction ;
