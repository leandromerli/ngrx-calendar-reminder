import { Component, EventEmitter, OnInit, Output, Input, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';


import {  forwardRef } from '@angular/core';
import { 
    ControlValueAccessor, 
    NG_VALUE_ACCESSOR 
} from '@angular/forms';



@Component({
  selector: 'time-picker',
  template: `
  <div class="d-flex justify-content-between align-items-center" >

             <mat-form-field class="hourMinuteInput">
                          <input type="text" 
                          [textMask]="{mask: mask,guide:true,keepCharPositions:true,placeholderChar:'\u2000'}"
                          #hourComponent  matInput name="hourMinute" [(ngModel)]="hourMinute" 
                           placeholder="Hr:Mn" size="5"
                          [disabled]="disabled" (blur)="changeHourMinute()"
                          aria-label="Hour/Minute"
                          autocomplete="newfield"
                          > <!--  -->
                            
                              <i *ngIf="showHourArrow" class="mat-up-arrow material-icons" (click)="hourAdd(1)">expand_less</i>
                            <i  *ngIf="showHourArrow" class="mat-down-arrow material-icons" (click)="hourAdd(-1)">expand_more</i>
 
             </mat-form-field>    
           
               
          <mat-form-field class="amPmSelect">
            <mat-select [(ngModel)]="ampm" (change)="changeAMPM()" [disabled]="disabled" >
                    <mat-option value='AM'>AM</mat-option>
                    <mat-option value='PM'>PM</mat-option>
                     <mat-option value='24'>24HR</mat-option>
            </mat-select>
            </mat-form-field>


    </div>   
  `,  styles:[`
  .amPmSelect{
    width: 58px !important;
  }
  .timeicon{
    color:gray;
    margin-right: 13px;
  }
  .md-up-arrow, .md-down-arrow {
    position: absolute;
    height: 0;
    top: 10px;
    right: 2px;
    color: rgba(0,0,0,0.38);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.md-up-arrow {    top: -3px;
}
.md-up-arrow:after, .md-down-arrow:after {
    display: block;
    position: relative;
    speak: none;
    font-size: 13px;
    transform: scaleY(.5) scaleX(1);
}
.hourMinuteInput{
  max-width:44px !important;
  min-width:44px !important;
  width: 44px !important;
}
md-select{
      /*width: 58px !important;*/
      padding-bottom:1.25em;
      margin-left:4px;
     // max-width: 60px;
}

`]
,
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    }  ]  
})
export class TimePickerComponent  implements AfterViewInit,ControlValueAccessor {
  
  public mask = [ /[0-9]/, /[0-9]/, ':', /[0-5]/,/[0-9]/]


    @Input() placeholder:string;
    @Input() disabled:boolean=false;
    @ViewChild("hourComponent") hourComponent; 
    @ViewChild("minutesComponent") minutesComponent; 
      
    @Input() ampm:string="AM"; 

    showHourArrow:boolean=false;
    showMinutesArrow:boolean=false;

    _innerValue:string;//FULL time 24hs string to emit outside

    private propagateChange = (_: any) => { };


    // this is the initial value set to the component
    //at init I set all as AM or PM
    public writeValue(val: any) {
           if(val){
           this.value=val
            
            if(this.hour>=13){ //for init
              this.ampm="PM";
              this.hour=this.hour-12;
            } else if(this.hour==0){
              if(this.minutes!=0){//special case.. when no hour set 00:00 then don't show as 12 AM (may be is more clear to show as 00:00 )
                  this.hour=12
                  this.ampm="AM";
               }else{
                  this.ampm="24";
               }
            }else if(this.hour==12){
              this.ampm="PM";
            }else{
              this.ampm="AM";
            }
             this.setTimeToShow()
            //this.hourMinute=this.hour+""+this.minutes;
            this.emit();
      
           }
    }
    //normal set after init (not considering converting to AM/PM format just as the user set in select)
    set value(val: any){
      if (val) {
          if(typeof val ==='string'){
            if(val.indexOf(":")>0){     
              let s=val.split(":")
              let hourString=s[0].trim();
              let minuteString=s[1].trim();
              console.log("hourString:minuteString","-"+hourString,minuteString,hourString.length,minuteString.length)

              if(minuteString.length==1&&hourString.length==2){//handle xx:x (90:0)
                  hourString=s[0].substr(0,1);
                  minuteString=s[0].substr(1,1)+s[1];
                  
                  console.log("NEW hourString:minuteString",hourString,minuteString)
              }
                if(minuteString.length==0&&hourString.length==2){//handle xx: (90:)
                  if(Number(hourString)>23){
                    hourString=s[0].substr(0,1);
                    minuteString=s[0].substr(1,1);
                  
                    console.log("NEW hourString:minuteString",hourString,minuteString)
                  }
              }

             
              this.hour=Number(hourString);
             
              if(!isNaN(Number(minuteString)))
                 this.minutes=Number(minuteString);
              else  
                 this.minutes=0;   
            
            }else{
              if(val.length>=3){
                this.hour=Number(val.substr(0,2));
                this.minutes=Number(val.substr(2));
              }else{
                this.hour=Number(val)
                this.minutes=0;
              }
            }
            this.setTimeToShow()
          }
      }   
    }
    changeHourMinute(){
      console.log("change hourMinute",this.hourMinute,this.ampm)
      
    //  if(this.hourMinute&&this.hourMinute.length==3){
     //   this.hourMinute="0"+this.hourMinute;
      //}

      this.value=this.hourMinute;//from user input

      if(this.hour>=13||this.hour==0){
          this.ampm="24"
      }
      this.emit()
    }
    _hourMinute;
    set hourMinute(v:any){
      this._hourMinute=v
     //setTimeout(function(){ this.changeHourMinute()},300);
    }
    get hourMinute(){
      return this._hourMinute;
    }


  /** when change select */
    changeAMPM(){
      console.log("changeAMPM",this.hour,this.ampm)
      let hour=this.hour;
      

    if(this.ampm=="PM"||this.ampm=="AM"){
      if(hour==0)
        hour=12  

      if(hour>12){
        console.log("change hour -12",hour)
        hour=hour-12;
      }  
    }
    if(this.ampm=="24"){
        //check if was PM then convert
        if(this._innerValue&&this._innerValue.length>2){
            let hour24=this._innerValue.substr(0,2);
            hour=Number(hour24);
        }

    }
    console.log("changeAMPM new set",hour,this.ampm)
    this.hour=hour;
   

      this.setTimeToShow();
      this.emit()
    }
  

    setTimeToShow(){
      console.log("setTimeToShow",this.hour)
       this.hourMinute=(this.hour.toString().length==1?"0"+this.hour:this.hour)+":"+(this.minutes.toString().length==1?"0"+this.minutes:this.minutes)
    }

    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    public registerOnTouched() { }


//  hourMinute:string;



  startListen:boolean=false;
  
  hour:number=0;
  minutes:number=0;

  validate(){
    if(this.hour>23){
       this.hour=23;
       this.setTimeToShow();
    }//minutes are validated thow mask
  }

  emit(){
      this.validate();
       let hour24=this.hour;


       if(this.ampm=="PM"){//if select PM then add 12hours
          if(this.hour<12&&this.hour>0){
             hour24=this.hour+12
          }
       }
      else if(this.ampm=="AM"){//if select AM then decrease 12hours if >=12
          if(this.hour>=12){
             hour24=this.hour-12
          }
       }
      
       this._innerValue=(hour24.toString().length==1?"0"+hour24:hour24)+":"+(this.minutes.toString().length==1?"0"+this.minutes:this.minutes)+":00"
      console.log("Inner value",this._innerValue)
   
      this.propagateChange(this._innerValue);

  }
  public valid:boolean=false;

  constructor() { 

  }

  ngAfterViewInit() {
    this.startListen=true;
    console.log("ok");

  }

 
  


}