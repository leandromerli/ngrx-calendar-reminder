import { ActionReducerMap } from '@ngrx/store';

import { ReminderReducer } from './reminder/reminder.reducer';
import { SelectedReminderReducer } from './selected-reminder/selected-reminder.reducer';
import { Weather } from './weather/weather.model';
import { WeatherReducer } from './weather/wheater.reducer';
import { Reminder } from './reminder/reminder.model';

export interface AppState {
  reminders: Reminder[];
  selectedReminder:Reminder;
  weathers:Weather[];
}

export const rootReducer: ActionReducerMap<AppState> = {
  reminders: ReminderReducer,
  selectedReminder:SelectedReminderReducer,
  weathers:WeatherReducer
};
