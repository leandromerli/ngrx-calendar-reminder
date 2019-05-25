
import * as SelectedReminderActions from './selected-reminder.actions';
import { Reminder } from '../reminder/reminder.model';


//const initialState: Reminder={};

export function SelectedReminderReducer(state: Reminder, action: SelectedReminderActions.SelectedReminderActionType) {
  switch (action.type) {
    case SelectedReminderActions.SELECT_REMINDER: {
      return action.payload
    }
    default: {
      return state;
    }
  }
}
