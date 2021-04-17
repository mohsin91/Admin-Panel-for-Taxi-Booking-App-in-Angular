import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { BannerAdsViewModel } from './banneradsview.model';
import { BannerAdsList } from './banneradsvewlist.model';
import { BanneradsService } from './bannerads.service';

@Component({
  selector: 'app-bannerads',
  templateUrl: './bannerads.component.html',
  styleUrls: ['./bannerads.component.css']
})
export class BanneradsComponent implements OnInit {

  result: any;
  page: Number = 1;
  pages: any;
  appsliderview: BannerAdsViewModel;
  appsliderlist: BannerAdsList[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: BanneradsService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    this.bannerAdsView();
  }
  bannerAdsView() {
    this.appspinner.spinnerAlert('show');
    this.service.banneradsListView().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.appsliderview = new BannerAdsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.appsliderview['data'][0].data.length > 0) {
          this.result = this.appsliderview['data'][0].data;
          this.result.map((x) => {
            if (x.Status === 'Active') {
              x.Status = true
            } else {
              x.Status = false
            }
          })
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available');
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
    this.service.banneradsStatusUpdate(data).subscribe(res => {
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


