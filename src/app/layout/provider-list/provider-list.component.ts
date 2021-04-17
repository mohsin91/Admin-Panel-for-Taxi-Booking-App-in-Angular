import {  Component, NgModule, Input, Output, EventEmitter, ViewEncapsulation, SimpleChanges, OnChanges, 
  OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { GuardGuard } from 'src/app/guard.guard';
import { AppComponent } from 'src/app/app.component';
import { ProviderlistService } from './providerlist.service';
import { ProviderModelList } from './provider.model';
import { ProviderListModel } from './provider-list.model';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

    page: Number = 1;
    sessionpage: Number;
    pages: any;
    commonpage: Number = 1;
    searchdata: String;
    pending: ProviderModelList[];
    providermodel : ProviderListModel;
    result : ProviderModelList[];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,    
      private service:ProviderlistService,
      private appspinner: AppComponent,
      private cookie: CookieService
    ) { }
    ngOnInit() {  
    // this.sessionpage = parseInt(sessionStorage.getItem('userlist'));
    // if( stringify(this.sessionpage) === 'NaN' ) {
    //     this.page = 1;   
    // } else {
    //     this.page = this.sessionpage;       
    // }
      this.appspinner.spinnerAlert('show');
      this.getprovidersSearch(this.page);
    }

    getprovidersSearch(page) {
      if (this.searchdata) {
        if (this.searchdata.length > 0) {
          this.findname(this.searchdata);
        } else {
          this.getProviders(page);
        }
      } else {
        this.getProviders(page);
      }
    }


    getProviders(page) {
      this.cookie.set('userlist',page);
      this.page = page;
      var pen = [];
      var reslt = [];
        this.appspinner.spinnerAlert('show');
      this.service.usersListView(page).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        this.providermodel = new ProviderListModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.providermodel['data'][0].data.length > 0) {
          this.page = page;          
          this.pages = this.providermodel['data'][1].Count;
          this.providermodel['data'][0].data.filter(x => {
            if (x.Status === '' || x.Status === 'pending') {
              pen.push(x);
            } else {
              reslt.push(x);
            }
          });
          this.result = reslt;
          this.pending = pen;
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
    providerUpdate(id, status,r,i) {
      var data = {Id : {Id : id}, updata: { Status: status} };
      if (status === 'reject') {
        environment.swalalert('delete', 'Rejected').then(value => {
        if (value) {
          this.service.providerEdit(data).subscribe((res) => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {            
            if(res.body['error'] === false ) {
              this.getProviders(this.page);
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
      this.service.providerEdit(data).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if(res.body['error'] === false ) {
          environment.swalalert('success', 'Approved Successfully').then(value => {
            if(value) {
              this.result[i] = {
                Id: r.Id,
                FirstName: r.FirstName,
                LastName: r.LastName,
                Email: r.Email,
                ExtCode: r.ExtCode,
                Mobile: r.Mobile,
                Status: status
              };
              this.router.navigateByUrl('/Providers');
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
  reset() {
    this.searchdata = '';
    this.getProviders(this.commonpage);
  }

  findname(search) {
    var data = { search: search, typename: 'providers', page: this.page }
    var pen = [];
    var reslt = [];
    this.service.providersearchdataView(data).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
        // this.appspinner.spinnerAlert('hide');
      } else {
        this.providermodel = new ProviderListModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.providermodel['data'][0].data.length > 0) {
          this.pages = this.providermodel['data'][1].Count;
          this.providermodel['data'][0].data.filter(x => {
            if (x.Status === '' || x.Status === 'pending') {
              pen.push(x);
            } else {
              reslt.push(x);
            }
          });
          this.result = reslt;
          // this.pending = pen;
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
  }
  
