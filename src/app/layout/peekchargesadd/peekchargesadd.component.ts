import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { PeekChargesAddModel } from './peekchargesadd.model';
import { PeekchargesaddService } from './peekchargesadd.service';

@Component({
  selector: 'app-peekchargesadd',
  templateUrl: './peekchargesadd.component.html',
  styleUrls: ['./peekchargesadd.component.css']
})
export class PeekchargesaddComponent implements OnInit {

  typeid: any;
  returnUrl: any;
  peekchargesAddForm: any;
  peekchargesaddtype: PeekChargesAddModel;
  time = {hour: 13, minute: 30};
  meridian = true;
  time1 = {hour: 13, minute: 30};
  meridian1 = true;
  weekDate: Boolean = false;
  dayDate: Boolean = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }
  weekList = [];
  weekListItems = [];
  weekSettings = {};
  DayDate: any = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  // public dateValue: Object = new Date(new Date().setDate(14));
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  public maxDate: Object = new Date(this.currentYear, 12, 31);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: PeekchargesaddService,
    private appspinner: AppComponent) {
    this.peekchargesAddForm = this.formBuilder.group({
      'type': ['day', [Validators.required, Validators.minLength(1)]],
      'name': ['', [Validators.required, Validators.minLength(1)]],
      'week': [''],
      'starttime': ['', [Validators.required, Validators.minLength(1)]],
      'endtime': ['', [Validators.required, Validators.minLength(1)]],
      'DayDate': [this.DayDate],
      'fare': ['', [Validators.required, Validators.minLength(1)]],
      'minamount': ['', [Validators.required, Validators.minLength(1)]],
      'maxamount': ['', [Validators.required, Validators.minLength(1)]]

    });

    this.weekSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'day',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 'All',
      allowSearchFilter: true
    }; 
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.weekList = [{
      id: 1 , day: 'Sunday'
    }, {id: 2, day: 'Monday'}, {id: 3, day: 'Tuesday'},{id:4,day: 'Wednesday'},{id:5, day: 'Thursday'},{id:6,day: 'Friday'},{id:7,day: 'Saturday'}];
    this.appspinner.spinnerAlert('hide');
  }


  peekchargesAdd() {

    if (this.peekchargesAddForm.valid) {

      var sF = this.peekchargesAddForm.value;
      // var sendData:{[k:string]:any} = {};
      var starttime = sF.starttime.hour + ':' + sF.starttime.minute + ':00';
      var endtime = sF.endtime.hour + ':' + sF.endtime.minute + ':00';

      if (sF.type === 'day') {

      this.peekchargesaddtype = new PeekChargesAddModel(
        sF.name,
        sF.type,
        null,
        this.formatDate(sF.DayDate),        
        starttime,
        endtime,
        sF.fare,
        sF.minamount,
        sF.maxamount
      );


      } else {

        sF.week.map((x) => {
          this.weekListItems.push('"'+ x.day + '"');
        });

        this.peekchargesaddtype = new PeekChargesAddModel(
          sF.name,
          sF.type,
          '[' + this.weekListItems + ']',
          null,        
          starttime,
          endtime,
          sF.fare,
          sF.minamount,
          sF.maxamount
        );

      }
      // var status = '';
      // if (sF.IsActive === true) {
      //   status += 'Active';
      // } else {
      //   status += 'InActive';
      // }
      // console.log(sF.validfrom.getFullYear() + "-" + sF.validfrom.getMonth() + 1 + "-" +sF.validfrom.getDate());

      this.service.peekchargesAdd(this.peekchargesaddtype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.peekchargesAddForm.reset();
                this.router.navigate(['peekCharges']);
              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      });
    }
    else {
      environment.swalalert('warning', 'Validation Required');
    }
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  changestatus(data) {
    if(data === 'week') {
      this.weekDate = true;
      this.dayDate = false;
    } else {
      this.weekDate = false;
      this.dayDate = true;
    }
  }

}
