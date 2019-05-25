import { Component, OnInit, Inject } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { AppState } from '../redux/app.reducer';
import * as ReminderActions from './../redux/reminder/reminder.actions';
import { Reminder } from '../redux/reminder/reminder.model';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeatherService } from '../_services/weather.service';
import { Observable } from 'rxjs';
import { getWheaterByCity } from '../redux/weather/wheater.selectors';
import { Weather } from '../redux/weather/weather.model';
import * as SelectedReminderActions from './../redux/selected-reminder/selected-reminder.actions';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.scss']
})
export class ReminderViewComponent implements OnInit {
  reminder$:Observable<Reminder>;

  weather$:Observable<Weather>;

  constructor(  public dialogRef: MatDialogRef<ReminderViewComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private store: Store<AppState>
                ,private weatherService:WeatherService
                ) {
                  
                  this.reminder$=this.store.select('selectedReminder')
                
                  this.reminder$.subscribe(reminder=>{
                    this.weather$=this.store.pipe(select(getWheaterByCity,{city:reminder.city}));
                  })
                 
                  
                 }

  ngOnInit() {
  }
  edit(reminder){
    this.store.dispatch(new SelectedReminderActions.EditReminderAction(reminder));
    this.dialogRef.close();
  }
  

}
