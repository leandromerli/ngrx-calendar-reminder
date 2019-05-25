import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarDate } from '../_models/calendar.date';
import * as _ from 'lodash';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  _selectedMonth:moment.Moment;
  @Input() 
  set selectedMonth(v:moment.Moment){
    this._selectedMonth=v;
  }
  get selectedMonth(){
    return this._selectedMonth;
  }

  dayNames = [];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }



  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.selectedMonth, 'month');
  }

  generateCalendar(): void {
    const dates = this.fillDates(this.selectedMonth);
    const weeks: CalendarDate[][] = [];
    
    while (dates.length > 0) {
      let week=dates.splice(0, 7)
      if(weeks.length==0){//first iteration, get dayNames
       this.dayNames=week.map(day=>day.mDate.format('dddd'))
      }
      weeks.push(week);
    }
    this.weeks = weeks;
   
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    let allDates=[]
    /*for(var i=start;i<start+4;i++){
   
        const d = moment(firstDayOfGrid).date(i);
        var day= {
         // today: this.isToday(d),
         // selected: this.isSelected(d),
          mDate: d
        };
      
        allDates.push(day);
    }
    return allDates;*/
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
         
              return {
                today: this.isToday(d),
                isPast:!this.isSelectedMonth(d),
                //selected: this.isSelected(d),
                isWeekend: d.day() ==0 || d.day()==6,
                mDate: d
              };
            });
  }

}
