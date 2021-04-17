import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { DashboardviewService } from './dashboardview.service';
import { DashboardViewModel } from './dashboardview.model';
import { DashboardList } from './dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardview: DashboardViewModel;
  dashboardlist: DashboardList[];
  users: any;
  providers: any;
  booking: any;
  ridevehicle: any;
  dayearning: any;
  weekearning: any;
  monthearning: any;
  yearearning: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: DashboardviewService,
    private appspinner: AppComponent
  ) { }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.dashboardListView().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.dashboardview = new DashboardViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.dashboardview['data'].length > 0) {
          this.dashboardlist = this.dashboardview['data'][0];
          Object.keys(this.dashboardlist).filter((x, i) => {
            if (this.dashboardlist[x] === '' || this.dashboardlist[x] === NaN || this.dashboardlist[x] === null) {
              this.dashboardlist[x] = 0;              
            }
            this.dashboardlist[x] = parseInt(this.dashboardlist[x]);
          })
          this.users = this.dashboardlist['userscount'];
          this.providers = this.dashboardlist['providerscount'];
          this.ridevehicle = this.dashboardlist['ridevehicletypecount'];
          this.booking = this.dashboardlist['bookingscount'];
          this.dayearning = this.dashboardlist['dayearning'];
          this.monthearning = this.dashboardlist['monthearning'];
          this.weekearning = this.dashboardlist['weekearning'];
          this.yearearning = this.dashboardlist['yearearning'];
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
    this.appspinner.spinnerAlert('hide');
  }

}
