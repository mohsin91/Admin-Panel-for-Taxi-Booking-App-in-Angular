import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { VehicleModelList } from './vehiclemodellist.model';
import { VehicleModelViewModel } from './vehiclemodelview.model';
import { VehiclemodelService } from './vehiclemodel.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-vehiclemodelview',
  templateUrl: './vehiclemodelview.component.html',
  styleUrls: ['./vehiclemodelview.component.css']
})
export class VehiclemodelviewComponent implements OnInit {    
          result : any;
          page: Number = 1;
          pages: any;
          vehiclemodelview: VehicleModelViewModel;
          vehiclemodellist: VehicleModelList[];
          constructor(
            private formBuilder:FormBuilder,
            private router:Router,
            private route:ActivatedRoute,
            private guard:GuardGuard,    
            private service: VehiclemodelService,
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
              this.vehiclemodelview = new VehicleModelViewModel(res['error'],res['msg'], res['data']);
              if (res['data'].length > 0 && this.vehiclemodelview['data'][0].data.length > 0) {
                this.result = this.vehiclemodelview['data'][0].data;
                this.pages = this.vehiclemodelview['data'][0].Count;
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
         getvehiclemodelView(page) {
      this.appspinner.spinnerAlert('show');
           this.cookie.set('vehicleModellist',page);
            this.service.vehiclebrandListView(this.page).subscribe((res) => {
              if (res['error']) {
                environment.swalalert('nodata', res['msg']);
                this.appspinner.spinnerAlert('hide');
              } else {              
              this.vehiclemodelview = new VehicleModelViewModel(res['error'],res['msg'], res['data']);
              if (res['data'].length > 0 && this.vehiclemodelview['data'][0].data.length > 0) {
                this.result = this.vehiclemodelview['data'][0].data;
                this.pages = this.vehiclemodelview['data'][0].Count;
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
        }
        
