import * as moment from 'moment';

export interface Reminder {
  id:number;
  mDate: moment.Moment;
  title:string;
  city:string;
  color:string;
}
