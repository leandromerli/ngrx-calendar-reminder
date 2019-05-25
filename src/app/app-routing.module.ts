import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarReminderComponent } from './calendar-reminder/calendar-reminder.component';


const routes: Routes = [
  { path: '',   component: CalendarReminderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
