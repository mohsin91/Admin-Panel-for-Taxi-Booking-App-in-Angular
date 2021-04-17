import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { RidetypeVehicleList } from './ridetypevehiclelist.model';
import { RidetypeVehicleViewModel } from './ridetypevehicleview.model';
import { RidetypevehicleviewService } from './ridetypevehicleview.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-ridetypevehicleview',
  templateUrl: './ridetypevehicleview.component.html',
  styleUrls: ['./ridetypevehicleview.component.css']
})
export class RidetypevehicleviewComponent implements OnInit {
  
      returnUrl:any;
      result : any;
      page: Number = 1;
      pages: any;
      ridevehicletypeview: RidetypeVehicleViewModel;
      ridevehicletypelist: RidetypeVehicleList[];
      constructor(
        private formBuilder:FormBuilder,
        private router:Router,
        private route:ActivatedRoute,
        private guard:GuardGuard,    
        private service:RidetypevehicleviewService,
        private appspinner: AppComponent,
        private cookie: CookieService
      ) { }
      ngOnInit() {
        this.appspinner.spinnerAlert('show');
        this.service.ridetypevehicleListView(this.page).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {      
          this.ridevehicletypeview = new RidetypeVehicleViewModel(res['error'],res['msg'], res['data']);
          if (res['data'].data.length > 0) {
            this.pages = this.ridevehicletypeview['data'].Count;
            this.result = this.ridevehicletypeview['data'].data;
            this.result.filter((x) => {
              if (x.IsActive === 'Yes') {
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
        this.cookie.set('ridevehiclelist',page);
        this.service.ridetypevehicleListView(page).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          this.ridevehicletypeview = new RidetypeVehicleViewModel(res['error'],res['msg'], res['data']);
            if (res['data'].data.length > 0) {
            this.pages = this.ridevehicletypeview['data'].Count;
            this.result = this.ridevehicletypeview['data'].data;
              this.result.filter((x) => {
                if (x.IsActive === 'Yes') {
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
      stats = 'Yes'
    } else {
      stats = 'No'
    }    
    var data = { Id: id, IsActive: stats}
    this.service.rideVehicleStatusUpdate(data).subscribe(res => {
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
    