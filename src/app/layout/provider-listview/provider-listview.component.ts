import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { GuardGuard } from 'src/app/guard.guard';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { ProviderListViewModel } from './provider-listview.model';
import { ProviderListviewService } from './provider-listview.service';

@Component({
  selector: 'app-provider-listview',
  templateUrl: './provider-listview.component.html',
  styleUrls: ['./provider-listview.component.css']
})
export class ProviderListviewComponent implements OnInit {

  paramsid: any;
  page: Number = 1;
  sessionpage: Number;
  pages: any;
  providermodel: ProviderListViewModel;
  result: [];
  resultview: any;
  providerDoc = [];
  image: any; 
  fn: any; 
  ln: any; 
  email: any; 
  extcode: any; 
  appversion: any;
  countryid: any;
  createat: any;
  firstname: any;
  isactive: any;
  isemailverified: any;
  ismobileverified: any;
  lastname: any;
  mobile: any;
  mobilebrand: any;
  mobilemodel: any;
  os: any;
  osversion: any;
  status: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: ProviderListviewService,
    private appspinner: AppComponent
  ) { }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      environment.swalalert('underconst', 'This Page has Under Contruction Work ');
      this.service.getProvider(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if (res.body['data'].length > 0) {
          this.result = res.body['data'];
          this.image = this.result['Image'];
          if (this.result['IsActive'] === 'yes') {
            this.isactive = 'online'
          } else {
            this.isactive = 'offline'
          }
          this.fn = this.result['FirstName'];
          this.ln = this.result['LastName'];
          this.email = this.result['Email'];
          this.extcode = this.result['ExtCode'];
          this.appversion = this.result['AppVersion'];
          this.countryid = this.result['CountryId'];
          this.createat = this.result['CreateAt'];
          this.firstname = this.result['FirstName'];
          this.isemailverified = this.result['IsEmailVerified'];
          this.ismobileverified = this.result['IsMobileVerified'];
          this.mobile = this.result['Mobile'];
          this.mobilebrand = this.result['MobileBrand'];
          this.mobilemodel = this.result['MobileModel'];
          this.os = this.result['OS'];
          this.osversion = this.result['OSVersion'];
          this.status = this.result['Status'];
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
      this.service.getProviderDocView(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if ([res.body['data']].length > 0) {
          this.providerDoc = [res.body['data']];
          // console.log(this.providerDoc);
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
    });
  }
  // providerUpdate(id) {
  //   var Id = this.route.snapshot.params.id;
  //   var data = { id: id , Value: this.providerDoc[0].Value  };
  //   console.log(data);
  //   this.service.providerListEdit(data).subscribe((res) => {
  //     if (res.body['error'] === false) {
  //       environment.swalalert('success', res.body['msg']).then(value => {
  //         if (value) {
  //           this.router.navigateByUrl('/Providers');
  //         }
  //       });
  //     } else {
  //       environment.swalalert('error', res.body['msg']);
  //     }
  //   },
  //     (err) => {
  //       console.log(err);
  //     })
  // }
  providerdocstatus(id, status) {
    var Id = this.route.snapshot.params.id;
    var data = { Id: { Id: id }, updata: status };
    this.service.providerDocEdit(data).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      if (res.body['error'] === false) {
        environment.swalalert('success', res.body['msg']).then(value => {
          if (value) {
            this.router.navigateByUrl('/Providers');
          }
        });
      } else {
        environment.swalalert('error', res.body['msg']);
      }
    }
    },
      (err) => {
        console.log(err);
      })
  }  
}

