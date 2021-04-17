import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { StaticPagesViewModel } from './staticpagesview.model';
import { StaticPagesList } from './staticpagesviewlist.model';
import { StaticpagesviewService } from './staticpagesview.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-staticpagesview',
  templateUrl: './staticpagesview.component.html',
  styleUrls: ['./staticpagesview.component.css']
})
export class StaticpagesviewComponent implements OnInit {
  
    result : any;
    page: Number = 1;
    pages: any;
    staticpageview: StaticPagesViewModel;
    staticpagelist: StaticPagesList[];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,    
      private service:StaticpagesviewService,
      private appspinner: AppComponent,
      private cookie: CookieService
    ) { }
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.service.staticpagesListView(this.page).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {            
        this.staticpageview = new StaticPagesViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.staticpageview['data'][0].data.length > 0) {
          this.pages = this.staticpageview['data'][0].Count;
          this.result = this.staticpageview['data'][0].data;
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
    },
    (err) => {
      console.log(err);
    });
    this.appspinner.spinnerAlert('hide');
  }
  getStaticView(page) {
    this.appspinner.spinnerAlert('show');
    this.cookie.set('staticpageslist',page);
      this.service.staticpagesListView(page).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        this.staticpageview = new StaticPagesViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.staticpageview['data'][0].data.length > 0) {
          this.pages = this.staticpageview['data'][0].Count;
          this.result = this.staticpageview['data'][0].data;
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
  