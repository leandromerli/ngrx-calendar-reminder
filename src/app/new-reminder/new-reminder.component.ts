import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.reducer';
import * as ReminderActions from './../redux/reminder/reminder.actions';
import { Reminder } from '../redux/reminder/reminder.model';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.scss']
})
export class NewReminderComponent implements OnInit {

  id:number;


  reminderForm:FormGroup;

  colorControl: FormControl;

  reminderToEdit:Reminder;

  constructor(  public dialogRef: MatDialogRef<NewReminderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private store: Store<AppState>) {
                  if(data&&data.id){
                    
                    this.id=data.id;
                    this.reminderToEdit=data;

                  }

                 }

  ngOnInit() {

    this.reminderForm = new FormGroup({
      'title': new FormControl("", [
        Validators.required,
        Validators.maxLength(30)
      ]),
      'mDate': new FormControl("", [
                   Validators.required
      ]),
      "time" :new FormControl("", [
        Validators.required
      ]),
      'city': new FormControl(""),
      //,'color': new FormControl("")
      color: new FormControl("#f0f0f0")
    });
    this.colorControl = <FormControl>this.reminderForm.controls['color'];

    if(this.reminderToEdit){
      let time=this.reminderToEdit.mDate.get('hour')+":"+this.reminderToEdit.mDate.get('minutes')
      this.reminderForm.patchValue(this.reminderToEdit);
      this.reminderForm.patchValue({time:time})
    }
  }
  validate(){
    //TODO
    return true;
  }
  save(){
    if(this.validate()){
      let isNew:boolean=false;
      if(!this.id){//JUST For testing assing id in this UI
        this.id=Math.random()
        isNew=true;
      }
     console.log(this.reminderForm.value)
     let hourMinutes=this.time.value.split(":")


     let dateWithTime=moment(this.mDate.value).set({
        'hour' : hourMinutes[0],
        'minute'  : hourMinutes[1]});

     let reminder:Reminder={
       id:this.id
       ,title:this.title.value
       ,mDate:dateWithTime
       ,color:this.color
       ,city:this.city.value
     }
     
     
     
      if(isNew){
        const action = new ReminderActions.AddReminderAction(
          reminder
        );
        this.store.dispatch(action);
      }else{
        const action = new ReminderActions.UpdateAction(
          reminder
        );
        this.store.dispatch(action);
      }
      this.dialogRef.close();
     
    }
  }

  get title() { return this.reminderForm.get('title'); }

  get mDate() { return this.reminderForm.get('mDate'); }

  get time() { return this.reminderForm.get('time'); }

  get city() { return this.reminderForm.get('city'); }

 
  someSetterMethod(newValue: string) {
    this.reminderForm.patchValue({
      color: newValue,
    });
  }

  get color(): string {
    return (
      this.reminderForm&&
      this.reminderForm.controls &&
      this.reminderForm.controls['color'] &&
      this.reminderForm.controls['color'].value ||
      null);
  }

  onColorPickerChange(colorCode: string): void {
    this.colorControl.setValue(colorCode);
    this.colorControl.markAsDirty();
    this.colorControl.markAsTouched();
  }

}
