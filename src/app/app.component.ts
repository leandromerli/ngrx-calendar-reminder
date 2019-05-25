import { Component, OnInit } from '@angular/core';
import { AppState } from './redux/app.reducer';
import { Store } from '@ngrx/store';

import * as ReminderActions from './redux/reminder/reminder.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngCalendarReminder';
  constructor(private store:Store<AppState>){

  }
  ngOnInit(){
 
  }
}
