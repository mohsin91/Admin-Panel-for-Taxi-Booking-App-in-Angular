import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { StateViewModel } from './stateview.model';
import { StateList } from './statelist.model';
import { StateviewService } from './stateview.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-stateview',
  templateUrl: './stateview.component.html',
  styleUrls: ['./stateview.component.css']
})
export class StateviewComponent implements OnInit {
  returnUrl:any;
  result : any;
  page: Number = 1;
  pages: any;
  stateview: StateViewModel;
  statelist: StateList[];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,    
    private service:StateviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.stateListView(this.page).subscribe((res) => {    
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      this.stateview = new StateViewModel(res['error'],res['msg'], res['data']);
      if (res['data'].length > 0 && this.stateview['data'][0].data.length > 0) {
        this.pages = this.stateview['data'][0].Count;
        this.result = this.stateview['data'][0].data;
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
}
getStateView(page) {
  this.appspinner.spinnerAlert('show');
  this.cookie.set('statelist',page);
    this.service.stateListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      this.stateview = new StateViewModel(res['error'],res['msg'], res['data']);
      if (res['data'].length > 0 && this.stateview['data'][0].data.length > 0) {
        this.pages = this.stateview['data'][0].Count;
        this.result = this.stateview['data'][0].data;
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
