import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BookingsViewModel } from './bookingsview.model';
import { BookingsList } from './bookingsviewlist.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  page: Number = 1;
  pages: any;
  commonpage: Number = 1;
  searchdata: String;
  bookingsview: BookingsViewModel;
  bookingslist: BookingsList[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: BookingsService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { 
  }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.bookingslistpageview(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.bookingsview['data'][0].data.length > 0) {
          this.pages = this.bookingsview['data'][0].Count;
          this.bookingslist = this.bookingsview['data'][0].data;          
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
  getBookingsView(page) {
    this.page = page;
    this.appspinner.spinnerAlert('show');
    this.cookie.set('bookingslist', page);
    if (this.searchdata !== undefined && this.searchdata.length !== 0) {
      console.log(this.searchdata.length);
    } else {
      this.searchdata = '';
    }
    if (this.searchdata.length > 0) {
      this.findname(this.searchdata);
    } else {    
    this.service.bookingslistpageview(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.bookingsview['data'][0].data.length > 0) {
          this.page = page;          
          this.pages = this.bookingsview['data'][0].Count;
          this.bookingslist = this.bookingsview['data'][0].data;
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


  reset() {
    this.searchdata = '';
    this.getBookingsView(this.commonpage);
  }

  findname(search) {
    var data = { search: search, typename: 'bookings', page: this.page }
    this.service.bookingsearchdataView(data).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
        // this.appspinner.spinnerAlert('hide');
      } else {
        this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.bookingsview['data'][0].data.length > 0) {
          this.pages = this.bookingsview['data'][0].Count;
          this.bookingslist = this.bookingsview['data'][0].data;
          this.appspinner.spinnerAlert('hide');
        } else {
          // environment.swalalert('nodata', 'No Data Available ');
          // this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }


  AutogetBookingsView() {
    this.service.bookingslistpageview(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
      } else {
        this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.bookingsview['data'][0].data.length > 0) {
          this.pages = this.bookingsview['data'][0].Count;
          this.bookingslist = this.bookingsview['data'][0].data;
        } else {
          environment.swalalert('nodata', 'No Data Available ');
        }
      }
    },
      (err) => {
        console.log(err);
      })
  }  

  public setintervalid = setInterval(() => {
    this.AutogetBookingsView();
  }, 5000);  
}

