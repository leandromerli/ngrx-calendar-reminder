import { Component, OnInit } from '@angular/core';
import { NewReminderComponent } from '../new-reminder/new-reminder.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-reminder',
  templateUrl: './calendar-reminder.component.html',
  styleUrls: ['./calendar-reminder.component.scss']
})
export class CalendarReminderComponent implements OnInit {
  
  constructor(private router:Router
    ,private dialog:MatDialog
){

}



  ngOnInit() {
  }

  onNew(){

    let dialogRef = this.dialog.open(NewReminderComponent, {
      data: {
           
          }
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);      
      if(result=="Continue"){
             
             // this.router.navigateByUrl("/main-video");
            }
      });
   
    }

}
