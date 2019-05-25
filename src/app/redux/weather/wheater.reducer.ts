
import * as WeatherActions from './weather.actions';
import { Weather } from './weather.model';

const initialState: Weather[] = [];

export function WeatherReducer(state: Weather[] = initialState, action: WeatherActions.WeatherActionType) {
  
  switch (action.type) {
    case WeatherActions.ADD_WEATHER: {
      return [
        ...state,
       action.payload
      ];
    }
    default: {
      return state;
    }
  }
}
