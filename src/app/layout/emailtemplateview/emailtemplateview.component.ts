import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { EmailTemplateViewModel } from './emailtemplateview.model';
import { EmailTemplateList } from './emailtemplateviewlist.model';
import { EmailtemplateviewService } from './emailtemplateview.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-emailtemplateview',
  templateUrl: './emailtemplateview.component.html',
  styleUrls: ['./emailtemplateview.component.css']
})
export class EmailtemplateviewComponent implements OnInit {

  result: any;
  page: Number = 1;
  pages: any;
  emailtemplateview: EmailTemplateViewModel;
  emailtemplatelist: EmailTemplateList[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: EmailtemplateviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.emailtemplateListView(this.page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      this.emailtemplateview = new EmailTemplateViewModel(res['error'], res['msg'], res['data']);
      if (res['data'].length > 0 && this.emailtemplateview['data'][0].data.length > 0) {
        this.pages = this.emailtemplateview['data'][0].Count;
        this.result = this.emailtemplateview['data'][0].data;
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
  getEmailTemplateView(page) {
    this.appspinner.spinnerAlert('show');
    this.cookie.set('emailtemplatepageslist', page);
    this.service.emailtemplateListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      this.emailtemplateview = new EmailTemplateViewModel(res['error'], res['msg'], res['data']);
      if (res['data'].length > 0 && this.emailtemplateview['data'][0].data.length > 0) {
        this.pages = this.emailtemplateview['data'][0].Count;
        this.result = this.emailtemplateview['data'][0].data;
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

