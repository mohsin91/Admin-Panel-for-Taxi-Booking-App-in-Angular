import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CancellationpolicyViewModel } from './cancellationpolicyview.model';
import { CancellationpolicyList } from './cancellationpolicyviewlist.model';
import { CancellationpolicyviewService } from './cancellationpolicyview.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cancellationpolicyview',
  templateUrl: './cancellationpolicyview.component.html',
  styleUrls: ['./cancellationpolicyview.component.css']
})
export class CancellationpolicyviewComponent implements OnInit {
    result : any;
    page: Number = 1;
    pages: any;
    cancellationpolicyview: CancellationpolicyViewModel;
    cancellationpolicylist: CancellationpolicyList[];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,    
      private service:CancellationpolicyviewService,
      private appspinner: AppComponent,
      private cookie: CookieService
    ) { }
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.service.cancellationpolicyListView('user',this.page).subscribe((res) => { 
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {                 
        this.cancellationpolicyview = new CancellationpolicyViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.cancellationpolicyview['data'][0].data.length > 0) {
          this.pages = this.cancellationpolicyview['data'][0].Count;
          this.result = this.cancellationpolicyview['data'][0].data;
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
  }
  getCancellationPolicyView(type,page) {
    this.appspinner.spinnerAlert('show');
    this.cookie.set('cancellationpolicylist',page);
      this.service.cancellationpolicyListView(type,page).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        this.cancellationpolicyview = new CancellationpolicyViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.cancellationpolicyview['data'][0].data.length > 0) {
          this.pages = this.cancellationpolicyview['data'][0].Count;
          this.result = this.cancellationpolicyview['data'][0].data;
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
    }
  }
  
