import { Reminder } from './reminder.model';
import * as ReminderActions from './reminder.actions';

const initialState: Reminder[] = [];

export function ReminderReducer(state: Reminder[] = initialState, action: ReminderActions.ReminderActionType) {
  switch (action.type) {
    case ReminderActions.ADD_REMINDER: {
      return [
        ...state,
       action.payload
      ];
    }
    case ReminderActions.DELETE_REMINDER: {
      return state.filter(reminder => action.id !== reminder.id );
    }
    case ReminderActions.UPDATE_REMINDER: {
      return state.map(reminder => {
        if (action.payload.id === reminder.id) {
          return {
            ...reminder,
            ...action.payload
          };
        }else {
          return reminder;
        }
      });
    }
  
    default: {
      return state;
    }
  }
}
