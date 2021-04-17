import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { ReviewManageViewModelList } from './reviewmanageview.model';
import { ReviewManageViewListModel } from './reviewmanageview-list.model';
import { ReviewmanagementService } from './reviewmanagement.service';

@Component({
  selector: 'app-reviewmanagement',
  templateUrl: './reviewmanagement.component.html',
  styleUrls: ['./reviewmanagement.component.css']
})
export class ReviewmanagementComponent implements OnInit {

  paramsid: any;
  cancelEditForm: any;
  reviewview: ReviewManageViewModelList;
  reviewmodel: ReviewManageViewListModel;
  userresult: any = [];
  providerresult: any = [];
  page: Number = 1;
  ppage: Number = 1;
  pages: any;
  ppages: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: ReviewmanagementService,
    private appspinner: AppComponent) {
  }

  ngOnInit() {
    this.getuserreviewmanagelist(this.page);
  
  }

  getuserreviewmanagelist(page) {
    var type = 'user';
    this.appspinner.spinnerAlert('show');
    this.service.getreviewmanageListView(type, page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.reviewmodel = new ReviewManageViewListModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.reviewmodel['data'][0].data.length > 0) {
          this.pages = this.reviewmodel['data'][0].Count;
          this.userresult = this.reviewmodel['data'][0].data;
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

  getproviderreviewmangelist(page) {
    var type = 'provider';
    this.appspinner.spinnerAlert('show');

    this.service.getreviewmanageListView(type, page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.reviewmodel = new ReviewManageViewListModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.reviewmodel['data'][0].data.length > 0) {
          this.ppages = this.reviewmodel['data'][0].Count;
          this.providerresult = this.reviewmodel['data'][0].data;
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


