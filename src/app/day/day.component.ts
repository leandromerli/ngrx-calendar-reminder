import { Component, OnInit, Input } from '@angular/core';
import { CalendarDate } from '../_models/calendar.date';
import * as moment from 'moment';
import { getRemindersByDate } from '../redux/reminder/reminder.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../redux/app.reducer';
import { Reminder } from '../redux/reminder/reminder.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day:CalendarDate;

  reminders$:Observable<Array<Reminder>>;//:Array<Reminder>;

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.readRemindersState();
  }

  private readRemindersState() {
   this.reminders$=this.store.pipe(select(getRemindersByDate, { mDate: this.day.mDate }));
  }
}
