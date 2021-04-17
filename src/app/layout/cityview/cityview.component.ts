import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { CityViewModel } from './cityview.model';
import { CityList } from './citylist.model';
import { CityviewService } from './cityview.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cityview',
  templateUrl: './cityview.component.html',
  styleUrls: ['./cityview.component.css']
})
export class CityviewComponent implements OnInit {
  returnUrl:any;
  result : any;
  page: Number = 1;
  pages: any;
  cityview: CityViewModel;
  citylist: CityList[];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,    
    private service:CityviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.cityListView(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');        
      } else {
      this.cityview = new CityViewModel(res['error'],res['msg'], res['data']);
      if (res['data'].length > 0 && this.cityview['data'][0].data.length > 0) {
        this.pages = this.cityview['data'][0].Count;
        this.result = this.cityview['data'][0].data;
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
getCityView(page) {
  this.appspinner.spinnerAlert('show');
  this.cookie.set('statelist',page);
    this.service.cityListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      this.cityview = new CityViewModel(res['error'],res['msg'], res['data']);
      if (res['data'].length > 0 && this.cityview['data'][0].data.length > 0) {
        this.pages = this.cityview['data'][0].Count;
        this.result = this.cityview['data'][0].data;
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
