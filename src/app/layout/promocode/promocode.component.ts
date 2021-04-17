import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import * as $ from '../../../assets/js/jquery.3.2.1.min.js';
import { PromoCodesViewModel } from './promocodes.model';
import { PromocodesService } from './promocodes.service';
import { PromoCodesList } from './promocodeslist.model';


@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {
  returnUrl: any;
  result: any;
  page: Number = 1;
  pages: any;
  promocodesview: PromoCodesViewModel;
  promocodeslist: PromoCodesList[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: PromocodesService,
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
    this.service.promocodesListView().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.promocodesview = new PromoCodesViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0) {
          
          this.result = this.promocodesview['data'];
          // console.log(this.result);        
          this.result.filter((x) => {
            if (x.Status === 'Active') {
              x.IsActive = true
            } else {
              x.IsActive = false
            }
          })
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
  getRideVehicleView(page) {
    this.cookie.set('ridevehiclelist', page);
    this.service.promocodesListView().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.promocodesview = new PromoCodesViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].data.length > 0) {
          this.pages = this.promocodesview['data'].Count;
          this.result = this.promocodesview['data'].data;
          this.result.filter((x) => {
            if (x.Status === 'Yes') {
              x.IsActive = true
            } else {
              x.IsActive = false
            }
          })
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
  changeStatus(id, stats) {
    if (stats === true) {
      stats = 'Active'
    } else {
      stats = 'InActive'
    }
    var data = { Id: id, Status: stats };
    this.service.promocodeStatusUpdate(data).subscribe(res => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        if (res.body['error'] === false) {
          // environment.swalalert('success', res.body['msg']).then(value => {
          //   if (value) {              
          //   }
          // });
        } else {
          environment.swalalert('error', res.body['msg']);
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
