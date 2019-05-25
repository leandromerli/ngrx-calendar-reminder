import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarReminderComponent } from './calendar-reminder/calendar-reminder.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { NewReminderComponent } from './new-reminder/new-reminder.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './redux/app.reducer';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
import { WeatherService } from './_services/weather.service';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

import { ColorPickerModule } from 'ngx-color-picker';
import { TimePickerComponent } from './_components/time-picker-component';
import { TextMaskModule } from 'angular2-text-mask';
import { EffectsModule } from '@ngrx/effects';
import { SelectedReminderEffects } from './redux/selected-reminder/selected-reminder.effects';
import { WeatherEffects } from './redux/weather/weather.effects';
import { DayReminderComponent } from './day-reminder/day-reminder.component';
import { MonthPickerComponent } from './_components/month-picker/month-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarReminderComponent,
    CalendarComponent,
    MonthComponent,
    DayComponent,
    DayReminderComponent,
    NewReminderComponent,
    MonthPickerComponent,
    ReminderViewComponent,
    TimePickerComponent
  ]
  ,entryComponents:[
    NewReminderComponent,
    ReminderViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([SelectedReminderEffects,WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    ColorPickerModule,
    TextMaskModule

    
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    WeatherService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
