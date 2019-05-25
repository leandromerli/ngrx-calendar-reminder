import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as SelectedReminderActions from './selected-reminder.actions';

import * as WeatherActions from '../weather/weather.actions';


import { MatDialog } from '@angular/material';
import { ReminderViewComponent } from 'src/app/reminder-view/reminder-view.component';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { SelectedReminderAction } from './selected-reminder.actions';
import { Observable } from 'rxjs';
import { NewReminderComponent } from 'src/app/new-reminder/new-reminder.component';

@Injectable()
export class SelectedReminderEffects {
  constructor( private actions$ : Actions
    ,private dialog:MatDialog
    ) {
}
  /**
   * Reminder view
   */
  @Effect() selectReminder$ = this.actions$.pipe(
     ofType<SelectedReminderAction>(SelectedReminderActions.SELECT_REMINDER)
    ,switchMap(action =>
      {
        
        let dialogRef = this.dialog.open(ReminderViewComponent, {
          data: action.payload.id
          });
          dialogRef.afterClosed().subscribe(result => {
          })
        
        return Observable.of({type: WeatherActions.GET_WEATHER, payload: {city:action.payload.city}});

      })
  );
  /**EDIT  */
  @Effect({dispatch: false}) selectReminderEdit$ = this.actions$.pipe(
    ofType<SelectedReminderAction>(SelectedReminderActions.EDIT_REMINDER)
   ,switchMap(action =>
     {
       
       let dialogRef = this.dialog.open(NewReminderComponent, {
         data: action.payload
         });
         dialogRef.afterClosed().subscribe(result => {
         })
       
       return Observable.of({});

     })
 );
    



}