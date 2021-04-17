import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import * as $ from '../../../assets/js/jquery.3.2.1.min.js';
import { PeekChargesViewModel } from './peekchargesview.model';
import { PeekChargesList } from './peekchargeslist.model';
import { PeekchargesviewService } from './peekchargesview.service';

@Component({
  selector: 'app-peekcharges',
  templateUrl: './peekcharges.component.html',
  styleUrls: ['./peekcharges.component.css']
})
export class PeekchargesComponent implements OnInit {

  returnUrl: any;
  result: any;
  page: Number = 1;
  pages: any;
  peekchargesview: PeekChargesViewModel;
  peekchargeslist: PeekChargesList[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: PeekchargesviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  public dateValue: Date = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  // public dateValue: Object = new Date(new Date().setDate(14));
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  public maxDate: Object = new Date(this.currentYear, 12, 31);
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.peekChargesListView(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.peekchargesview = new PeekChargesViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0) {     
          this.pages = this.peekchargesview['data'][0].Count;
          this.result = this.peekchargesview['data'][0].data;
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
  getpeekchargesview(page) {
    this.cookie.set('peekchargeslist', page);
    this.service.peekChargesListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.peekchargesview = new PeekChargesViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].data.length > 0) {
          this.pages = this.peekchargesview['data'].Count;
          this.result = this.peekchargesview['data'].data;
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
