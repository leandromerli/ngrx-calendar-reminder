import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Weather } from './weather.model';


export const getState  = (state: AppState) => state;
//GET ALL
export const getWeathers  = (state: AppState) => state.weathers;


export const getWheaterByCity = createSelector(getWeathers, (reminders:Weather[],props) => {
  let results= reminders.filter(reminder => reminder.city===props.city);
  if(results.length>0)return results[0];
});

