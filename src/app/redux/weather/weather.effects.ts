import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as WeatherActions from './weather.actions';
import { WeatherService } from 'src/app/_services/weather.service';

import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Observable } from 'rxjs';

import { GetWeatherAction } from './weather.actions';

@Injectable()
export class WeatherEffects {
  constructor( private actions$ : Actions, 
    private wheatherService : WeatherService
    ) {
}

  @Effect() weather$ = this.actions$.pipe(
     ofType<GetWeatherAction>(WeatherActions.GET_WEATHER)
    ,switchMap(action =>
      {
        
        
        return this.wheatherService.getWeatheritemsbyCity(action.payload.city)
          .map(weather => ({type: WeatherActions.ADD_WEATHER, payload:{city:action.payload.city,weatherData: weather}}))
          .catch(() => Observable.of({type:  WeatherActions.WEATHER_ERROR}));

      })
  );
    



}