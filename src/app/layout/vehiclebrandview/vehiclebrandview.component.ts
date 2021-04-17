import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { VehiclebrandviewService } from './vehiclebrandview.service';
import { VehicleBrandViewModel } from './vehiclebrandview.model';
import { VehicleBrandList } from './vehiclebrandlist.model';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-vehiclebrandview',
  templateUrl: './vehiclebrandview.component.html',
  styleUrls: ['./vehiclebrandview.component.css']
})
export class VehiclebrandviewComponent implements OnInit {
   
        returnUrl:any;
        result : any;
        page: Number = 1;
        pages: any;
        vehiclebrandview: VehicleBrandViewModel;
        vehiclebrandlist: VehicleBrandList[];
        constructor(
          private formBuilder:FormBuilder,
          private router:Router,
          private route:ActivatedRoute,
          private guard:GuardGuard,    
          private service:VehiclebrandviewService,
          private appspinner: AppComponent,
          private cookie: CookieService
        ) { }
        ngOnInit() {
          this.appspinner.spinnerAlert('show');
          this.service.vehiclebrandListView(this.page).subscribe((res) => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {            
            this.vehiclebrandview = new VehicleBrandViewModel(res['error'],res['msg'], res['data']);
            if (res['data'].length > 0 && this.vehiclebrandview['data'][0].data.length > 0) {
              this.result = this.vehiclebrandview['data'][0].data;
              this.pages = this.vehiclebrandview['data'][0].Count;
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
       getvehiclebrandView(page) {
         this.cookie.set('vehicleBrandlist',page);
          this.service.vehiclebrandListView(this.page).subscribe((res) => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {            
            this.vehiclebrandview = new VehicleBrandViewModel(res['error'],res['msg'], res['data']);
            if (res['data'].length > 0 && this.vehiclebrandview['data'][0].data.length > 0) {
              this.result = this.vehiclebrandview['data'][0].data;
              this.pages = this.vehiclebrandview['data'][0].Count;
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
      