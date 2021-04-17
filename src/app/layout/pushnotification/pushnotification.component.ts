import { Component, OnInit, HostListener, DoCheck, OnChanges, AfterViewInit } from '@angular/core';
import * as $ from "../../../assets/js/jquery.3.2.1.min.js";
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ScrollEvent } from 'ngx-scroll-event';
import { PushNotificationViewModel } from './pushnotificationlist.model.js';
import { PushNotificationViewList } from './pushnotificationview.model.js';
import { PushnotificationService } from './pushnotification.service.js';

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.css']
})
export class PushnotificationComponent implements OnInit {
  result: any;
  page: Number = 1;
  pages: any;
  pushview: PushNotificationViewModel;
  pushviewlist: PushNotificationViewList[];
  userpage: Number = 0;
  providerpage: Number = 0;
  searchdata: String;
  commontypename: String = 'user';
  selected: any = [];
  masterSelected: boolean;
  checkedList: any;  
  title: String;
  body: String;
  message: String;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: PushnotificationService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { 
    this.masterSelected = false;
  }

  ngOnInit() {
    // environment.swalalert('underconst', 'This Page has Under Contruction Work ');
    $(document).ready(function () {
      $('#search').on("click", (function (e) {
        $(".form-group").addClass("sb-search-open");
        e.stopPropagation()
      }));
      $(document).on("click", function (e) {
        if ($(e.target).is("#search") === false && $(".form-control").val().length == 0) {
          $(".form-group").removeClass("sb-search-open");
        }
      });
      $(".form-control-submit").click(function (e) {
        $(".form-control").each(function () {
          if ($(".form-control").val().length == 0) {
            e.preventDefault();
            $(this).css('border', '2px solid #ffcd3c');
          }
        })
      })
    })
    this.appspinner.spinnerAlert('show');
    this.service.pushviewListView(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
          this.pages = this.pushview['data'][0].Count;
          this.result = this.pushview['data'][0].data;
          this.result.map(x => {
            x['isSelected'] = false;
          });
          this.getCheckedItemList();    
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

  handleScroll(event: ScrollEvent, type, pageno) {

    var fnlht = event.originalEvent.srcElement.scrollHeight;
    if (type === 'user') {
      if ($('#home').scrollTop() + $('#home').height() === fnlht) {
        this.userpage += pageno

        this.service.pushviewListView(this.userpage).subscribe((res) => {
          if (res['error']) {
            // environment.swalalert('nodata', res['msg']);
            // environment.swalalert('nodata', 'No Data Available ');
          } else {
            this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
            if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
              this.result = this.result.concat(this.pushview['data'][0].data);
              this.result.map(x => {
                x['isSelected'] = false;
              });
            } else {
              // environment.swalalert('nodata', 'No Data Available ');
            }
          }
        },
          (err) => {
            console.log(err);
          });

      }
    } else {

      if ($('#menu2').scrollTop() + $('#menu2').height() === fnlht) {
        this.providerpage += pageno
        this.service.pushproviderviewListView(this.providerpage).subscribe((res) => {
          if (res['error']) {
            // environment.swalalert('nodata', res['msg']);
          } else {
            this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
            if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
              this.result = this.result.concat(this.pushview['data'][0].data);
              this.result.map(x => {
                x['isSelected'] = false;
              });
            } else {
              // environment.swalalert('nodata', 'No Data Available ');
            }
          }
        },
          (err) => {
            console.log(err);
          });

      }
    }

  }

  checkUncheckAll() {
    for (var i = 0; i < this.result.length; i++) {
      this.result[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.result.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.result.length; i++) {
      if (this.result[i].isSelected)
        this.checkedList.push(this.result[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
  }

  findname(search) {
    if (this.commontypename === 'user') {
      if (search.length >= 3) {
        this.service.pushusersearchdataView(search).subscribe((res) => {
          if (res['error']) {
            // environment.swalalert('nodata', res['msg']);
            // this.appspinner.spinnerAlert('hide');
          } else {
            this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
            if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
              // this.pages = this.pushview['data'][0].Count;
              this.result = this.pushview['data'][0].data;
              this.result.map(x => {
                x['isSelected'] = false;
              });
              // this.appspinner.spinnerAlert('hide');
            } else {
              // environment.swalalert('nodata', 'No Data Available ');
              // this.appspinner.spinnerAlert('hide');
            }
          }
        },
          (err) => {
            console.log(err);
          });
      } else {
        this.pushusersView(this.page, 'user');
      }
    } else if (this.commontypename === 'provider') {
      if (search.length >= 3) {      
      this.service.pushprovidersearchdataView(search).subscribe((res) => {
        if (res['error']) {
          // environment.swalalert('nodata', res['msg']);
          // this.appspinner.spinnerAlert('hide');
        } else {
          this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
          if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
            // this.pages = this.pushview['data'][0].Count;
            this.result = this.pushview['data'][0].data;
            this.result.map(x => {
              x['isSelected'] = false;
            });
            // this.appspinner.spinnerAlert('hide');
          } else {
            // environment.swalalert('nodata', 'No Data Available ');
            // this.appspinner.spinnerAlert('hide');
          }
        }
      },
        (err) => {
          console.log(err);
        });
      } else {
        this.pushprovidersView(this.page, 'provider');
      }
    } else {
    } 


  }
  pushusersView(page, type) {
    this.commontypename = type;
    this.cookie.set('emailtemplatepageslist', page);
    this.service.pushviewListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
      } else {
        this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
          this.pages = this.pushview['data'][0].Count;
          this.result = this.pushview['data'][0].data;
          this.result.map(x => {
            x['isSelected'] = false;
          });
        } else {
          environment.swalalert('nodata', 'No Data Available ');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }
  pushprovidersView(page, type) {
    this.commontypename = type;
    this.cookie.set('emailtemplatepageslist', page);
    this.service.pushproviderviewListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
      } else {
        this.pushview = new PushNotificationViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.pushview['data'][0].data.length > 0) {
          this.pages = this.pushview['data'][0].Count;
          this.result = this.pushview['data'][0].data;
          this.result.map(x => {
            x['isSelected'] = false;
          });
        } else {
          environment.swalalert('nodata', 'No Data Available ');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }
  pushnotificationAdd() {
    var ID = [];
    var msgdata = { title: this.title, body: this.body, data: this.message};
    this.checkedList.map(x => {
      ID.push(x.Id);
    });
    var data = {
      data : ID,
      msg : msgdata
    };
    if (this.commontypename === 'user') {
      this.service.userPushNotificationSend(data).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {
            if (res.body['error'] === false) {
              environment.swalalert('success', res.body['msg']).then(value => {
                if (value) {
                  // this.title = '';
                  // this.body = '';
                  // this.message = '';
                }
              });
            } else {
              environment.swalalert('error', res.body['msg']);
            }
          }
        });
    } else if (this.commontypename === 'provider') {
      this.service.providerPushNotificationSend(data).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                // this.title = '';
                // this.body = '';
                // this.message = '';
              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      }); 
    } else {

    }
  }
}



