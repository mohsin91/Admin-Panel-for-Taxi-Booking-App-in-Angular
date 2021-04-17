import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { CountryList } from './countrylist.model';
import { CountryViewModel } from './countryview.model';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CountryviewService } from './countryview.service';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-countryview',
  templateUrl: './countryview.component.html',
  styleUrls: ['./countryview.component.css']
})
export class CountryviewComponent implements OnInit {
  returnUrl:any;
  result : any;
  page: Number = 1;
  pages: any;
  countryview: CountryViewModel;
  countrylist: CountryList[];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,    
    private service:CountryviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.countryListView(this.page).subscribe((res) => {  
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {              
      this.countryview = new CountryViewModel(res['error'],res['msg'], res['data']);
      if (res['data'].length > 0 && this.countryview['data'][0].data.length > 0) {
        this.pages = this.countryview['data'][0].Count;
        this.result = this.countryview['data'][0].data;
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
  getCountryView(page) {
    this.cookie.set('countrylist',page);
    this.appspinner.spinnerAlert('show');
    this.service.countryListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.countryview = new CountryViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.countryview['data'][0].data.length > 0) {
          this.pages = this.countryview['data'][0].Count;
          this.result = this.countryview['data'][0].data;
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
