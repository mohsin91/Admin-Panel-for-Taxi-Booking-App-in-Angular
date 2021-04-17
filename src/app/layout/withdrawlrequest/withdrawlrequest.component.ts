import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { WithdrawlrequestService } from './withdrawlrequest.service';
import { WithdrawlRequestViewModelList } from './withdrawlrequest.model';
import { WithdrawlRequestViewListModel } from './withdrawlrequest-list.model';


@Component({
  selector: 'app-withdrawlrequest',
  templateUrl: './withdrawlrequest.component.html',
  styleUrls: ['./withdrawlrequest.component.css']
})
export class WithdrawlrequestComponent implements OnInit {

  paramsid: any;
  cancelEditForm: any;
  withdrawlview: WithdrawlRequestViewModelList;
  withdrawlmodel: WithdrawlRequestViewListModel;
  result: any = [];
  page: Number = 1;
  pages: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: WithdrawlrequestService,
    private appspinner: AppComponent) {
  }

  ngOnInit() {
    this.getwithdrawlrequestlist(this.page);
  
  }

  getwithdrawlrequestlist(page) {
    this.appspinner.spinnerAlert('show');
    this.service.getwithdrawlrequestListView(page).subscribe((res) => {
     
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.withdrawlmodel = new WithdrawlRequestViewListModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.withdrawlmodel['data'][0].data.length > 0) {
          
          this.pages = this.withdrawlmodel['data'][0].Count;
          this.result = this.withdrawlmodel['data'][0].data;
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


  withdrawlstatusUpdate(id, status,r,i) {
    var data = {Id : id, Status: status };
    if (status === 'rejected') {
      environment.swalalert('delete', 'Rejected').then(value => {
      if (value) {
        this.service.withdrawlrequestStatusUpdate(data).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {            
          if(res.body['error'] === false ) {
            this.result[i] = {
              Id: r.Id,
              Amount: r.Amount,
              Status: status
            };
          } else {
            environment.swalalert('error',res.body['msg']);        
          }
        }
        },
        (err) => {
          console.log(err);
        })
      }
    }); 
      
    } else {
    this.service.withdrawlrequestStatusUpdate(data).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {        
      if(res.body['error'] === false ) {
        environment.swalalert('success', 'Approved Successfully').then(value => {
          if(value) {
            this.result[i] = {
              Id: r.Id,
              Amount: r.Amount,
              Status: status
            };
            // this.router.navigateByUrl('/withDrawlRequest');
          }
          });
      } else {
        environment.swalalert('error',res.body['msg']);        
      }
    }
    },
    (err) => {
      console.log(err);
    })
    }  
  }




}



