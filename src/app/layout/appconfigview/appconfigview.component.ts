import {  Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { GuardGuard } from 'src/app/guard.guard';
import { AppConfigModelList } from './appconfigview.model';
import { AppConfigModel } from './appconfigview-list.model';
import { AppconfigviewService } from './appconfigview.service';
import { environment } from '../../../environments/environment';
import * as $ from '../../../assets/js/jquery.3.2.1.min.js';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appconfigview',
  templateUrl: './appconfigview.component.html',
  styleUrls: ['./appconfigview.component.css']
})
export class AppconfigviewComponent implements OnInit {
    returnUrl: any;
    sessionpage: Number;
    appconfigmodel: AppConfigModel;
    appconfiglist: AppConfigModelList;
    userresult: any = [];
    providerresult: any = [];
    emailresult: any = [];
    vvalue: FormControl;
    eyeview: Boolean= true;
    eyeviews: Boolean = false;    
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,    
      private service:AppconfigviewService,
      private appspinner: AppComponent,
      private cookie: CookieService
    ) { }
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.appspinner.spinnerAlert('hide');
      this.appspinner.spinnerAlert('show');
      this.service.appConfigListView().subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        this.appconfigmodel = new AppConfigModel(res['error'], res['msg'], res['data']);
        var fnl = this.appconfigmodel['data'][0].data;
        if (res['data'].length > 0 && fnl.length > 0) {
        fnl.filter(x => {
          if (x['FieldName'] === 'AUTH_TYPE') {
            x['authname'] = 'Authentication Type';
          } else if (x['FieldName'] === 'OTP_TIMER') {
            x['authname'] = 'OTP Timer';
          } else if (x['FieldName'] === 'WAITING_TIME') {
            x['authname'] = 'Waiting Time';
          } else if (x['FieldName'] === 'MAP_API_KEY') {
            x['authname'] = 'Google Map Api Key';
          } else if (x['FieldName'] === 'SMTP_SERVER') {
            x['authname'] = 'Server Name';
          } else if (x['FieldName'] === 'SMTP_PORT') {
            x['authname'] = 'Port Number';
          } else if (x['FieldName'] === 'SMTP_SECURE') {
            x['authname'] = 'Secure Id';
          } else if (x['FieldName'] === 'SMTP_USER') {
            x['authname'] = 'User Name';
          } else if (x['FieldName'] === 'SMTP_PASSWORD') {
            x['authname'] = 'Password';
          } else if (x['FieldName'] === 'PICKUP_DISTANCE') {
            x['authname'] = 'Pickup Point Distance';
          } else if (x['FieldName'] === 'MAX_RANGE') {
            x['authname'] = 'Maximum Trip Range (in km)';
          } else if (x['FieldName'] === 'FB_APP_ID') {
            x['authname'] = 'FACEBOOK APP ID';
          } else if (x['FieldName'] === 'GOOGLE_ID') {
            x['authname'] = 'GOOGLE APP ID';
          } else if (x['FieldName'] === 'SOS_NUMBER') {
            x['authname'] = 'SOS NUMBER';
          }
                            
        });
        fnl.filter((f) => {
          if (f.Type === 'user') {
            if (f.FieldName === 'MAX_RANGE') {
              f.Value = parseFloat(f.Value) / 1000;           
            }
            this.userresult.push(f);
          } else if (f.Type === 'provider') {
            this.providerresult.push(f);
          } else {
            this.emailresult.push(f);
          }
        });
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
      },
        (err) => {
          console.log(err);
        })
    $('nav-item nav-link').removeClass('active').addClass('active');
    }

    disabledchange(event) {
    document.getElementById(event)
    .removeAttribute('disabled');
    }
    adddisabledchange(event) {
      document.getElementById(event)
        .setAttribute('disabled', 'disabled');
    }    
    editAppConfig(name,id,event,fieldname) {
      this.cookie.set('appconfiglist',name);
      if (fieldname === 'MAX_RANGE') {
        event = event * 1000;
      }
        this.appconfiglist = new AppConfigModelList(
          id,
          event
        );
        this.service.appconfigEdit(this.appconfiglist).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {         
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                
                this.router.navigate(['appConfigView']);
              }
              });           
          } else {
            environment.swalalert('error',res.body['msg']);          
          }
        }
        }); 
    }
    viewpassword(type) {
      if (type === 'vs') {
        this.eyeview = true;        
        this.eyeviews = false;
      } else {
        this.eyeview = false;
        this.eyeviews = true;
      }
        var x:any = document.getElementById("passwordmyInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }
  }
