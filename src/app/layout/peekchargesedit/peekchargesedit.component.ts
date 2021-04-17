import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { PeekChargesEditModel } from './peekchargesedit.model';
import { PeekchargeseditService } from './peekchargesedit.service';

@Component({
  selector: 'app-peekchargesedit',
  templateUrl: './peekchargesedit.component.html',
  styleUrls: ['./peekchargesedit.component.css']
})
export class PeekchargeseditComponent implements OnInit {

  returnUrl: any;
  peekchargesEditForm: any;
  peekchargesedittype: PeekChargesEditModel;
  paramsid: any;
  time = {hour: 13, minute: 30};
  meridian = true;
  time1 = {hour: 13, minute: 30};
  meridian1 = true;
  weekDate: Boolean = false;
  dayDate: Boolean = true;
  weekList: any = [];
  weekListItems: any = [];
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
    private service: PeekchargeseditService,
    private appspinner: AppComponent) {

    this.peekchargesEditForm = this.formBuilder.group({
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

    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getpeekChargesEditlist(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          var rs = res.body['data'];
          this.weekList = [{
            id: 1 , day: 'Sunday'
          }, {id: 2, day: 'Monday'}, {id: 3, day: 'Tuesday'},{id:4,day: 'Wednesday'},{id:5, day: 'Thursday'},{id:6,day: 'Friday'},{id:7,day: 'Saturday'}];
          var sstarttime = rs.StartTime.split(':');
          var sendtime = rs.EndTime.split(':');
          this.time.hour = parseInt(sstarttime[0]);
          this.time.minute = parseInt(sstarttime[1]);
          this.time1.hour = parseInt(sendtime[0]);
          this.time1.minute = parseInt(sendtime[1]); 
          // var status;
          // if (rs.Status === 'Active') {
          //   status = true;
          // } else {
          //   status = false;
          // }
          if(rs.Type === 'week') {
            rs.Week.map((c) => {
              this.weekList.filter((d) => {
                if (d['day'] === c) {
                  this.weekListItems.push(d);
                }
              });
            });
          } else {
            this.weekListItems = [];
          }
          this.changestatus(rs.Type);
          this.peekchargesedittype = new PeekChargesEditModel(
            rs.Id,
            rs.Name,
            rs.Type,
            this.weekListItems,
            rs.Day,
            this.time,
            this.time1,
            rs.Fare,
            rs.MinAmount,
            rs.MaxAmount
          );
          this.peekchargesEditForm = this.formBuilder.group({
            'type': [this.peekchargesedittype.type, [Validators.required, Validators.minLength(1)]],
            'name': [this.peekchargesedittype.name, [Validators.required, Validators.minLength(1)]],
            'week': [this.peekchargesedittype.weekdata],
            'starttime': [this.peekchargesedittype.starttime, [Validators.required, Validators.minLength(1)]],
            'endtime': [this.peekchargesedittype.endtime, [Validators.required, Validators.minLength(1)]],
            'DayDate': [this.peekchargesedittype.daydata],
            'fare': [this.peekchargesedittype.fare, [Validators.required, Validators.minLength(1)]],
            'minamount': [this.peekchargesedittype.minamount, [Validators.required, Validators.minLength(1)]],
            'maxamount': [this.peekchargesedittype.maxamount, [Validators.required, Validators.minLength(1)]]
          });

        }
      })
    });
    this.appspinner.spinnerAlert('hide');
  }

  peekchargesEdit() {
    var Id = this.route.snapshot.params.id;
    if (this.peekchargesEditForm.valid) {
      var rs = this.peekchargesEditForm.value;
      
      // var status = '';
      // if (this.IsActive === true) {
      //   status += 'Active';
      // } else {
      //   status += 'InActive';
      // }
      var starttime = rs.starttime.hour + ':' + rs.starttime.minute + ':00';
      var endtime = rs.endtime.hour + ':' + rs.endtime.minute + ':00';
      if (rs.type === 'day') {

        this.peekchargesedittype = new PeekChargesEditModel(
          Id,
          rs.name,
          rs.type,
          null,
          this.formatDate(rs.DayDate),        
          starttime,
          endtime,
          rs.fare,
          rs.minamount,
          rs.maxamount
        );
        } else {
          var weekklist = [];
          this.weekListItems.map((x) => {
            weekklist.push('"'+ x.day + '"');
          });  
          this.peekchargesedittype = new PeekChargesEditModel(
            Id,
            rs.name,
            rs.type,
            '[' + weekklist + ']',
            null,        
            starttime,
            endtime,
            rs.fare,
            rs.minamount,
            rs.maxamount
          );
  
        }
      this.service.peekChargesEdit(this.peekchargesedittype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.router.navigate(['peekCharges']);
              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      });
    // }
    }
    else {
      environment.swalalert('warning', 'Validation Required');
    }
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
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
