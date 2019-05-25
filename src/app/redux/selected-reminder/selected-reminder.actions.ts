import { Action } from '@ngrx/store';
import * as moment from 'moment';

export const SELECT_REMINDER    = '[SELECTED_REMINDER] select';

export const EDIT_REMINDER    = '[SELECTED_REMINDER] edit';

export class SelectedReminderAction implements Action {
  readonly type = SELECT_REMINDER;
  

  constructor(
    public payload: { id:number; 
      mDate: moment.Moment;
      title:string;
      city:string;
      color:string; }
  ) {
    
  }
}
export class EditReminderAction implements Action {
  readonly type = EDIT_REMINDER;
  

  constructor(public payload: { id:number; 
    mDate: moment.Moment;
    title:string;
    city:string;
    color:string; }
  ) {
    
  }
}



export type SelectedReminderActionType =
SelectedReminderAction |
EditReminderAction