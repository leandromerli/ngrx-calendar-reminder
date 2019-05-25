import { Action } from '@ngrx/store';
import * as moment from 'moment';

export const ADD_REMINDER    = '[REMINDER] add';
export const DELETE_REMINDER = '[REMINDER] delete';
export const UPDATE_REMINDER = '[REMINDER] update';


export class AddReminderAction implements Action {
  readonly type = ADD_REMINDER;
  

  constructor(
    public payload: { id:number; 
      mDate: moment.Moment;
      title:string;
      city:string;
      color:string; }
  ) {
    
  }
}


export class DeleteReminderAction implements Action {
  readonly type = DELETE_REMINDER;

  constructor(
    public id: number
  ) {}
}


export class UpdateAction implements Action {
  readonly type = UPDATE_REMINDER;

  constructor(public payload: {   id:number;
                                  mDate: moment.Moment;
                                  title:string;
                                  city:string;
                                  color:string; }
  ) {}
}


export type ReminderActionType =
AddReminderAction |
DeleteReminderAction |
UpdateAction 
