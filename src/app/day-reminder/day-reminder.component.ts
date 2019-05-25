import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewReminderComponent } from '../new-reminder/new-reminder.component';
import { ReminderViewComponent } from '../reminder-view/reminder-view.component';
import { Reminder } from '../redux/reminder/reminder.model';
import { AppState } from '../redux/app.reducer';
import { Store } from '@ngrx/store';
import * as SelectedReminderActions from './../redux/selected-reminder/selected-reminder.actions';

@Component({
  selector: 'app-day-reminder',
  templateUrl: './day-reminder.component.html',
  styleUrls: ['./day-reminder.component.scss']
})
export class DayReminderComponent implements OnInit {

  @Input() reminder: Reminder;
  constructor(private dialog:MatDialog,private store:Store<AppState>) { }

  ngOnInit() {
  }
  viewReminder(){
    this.store.dispatch(new SelectedReminderActions.SelectedReminderAction(this.reminder));
  }

}
