import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { DoctypeViewModel } from './doctypeview.model';
import { DoctypeList } from './doctypelist.model';
import { environment } from '../../../environments/environment';
import { DoctypeviewService } from './doctypeview.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-doctypeview',
  templateUrl: './doctypeview.component.html',
  styleUrls: ['./doctypeview.component.css']
})
export class DoctypeviewComponent implements OnInit {
    returnUrl:any;
    result : any;
    page: Number = 1;
    pages: any;
    doctypeview: DoctypeViewModel;
    doctypelist: DoctypeList[];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,    
      private service:DoctypeviewService,
      private appspinner: AppComponent
    ) { }
    ngOnInit() {
      this.appspinner.spinnerAlert('show');      
      this.service.doctypeListView(this.page).subscribe((res) => { 
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {           
        this.doctypeview = new DoctypeViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.doctypeview['data'][0].data.length > 0) {
          this.pages = this.doctypeview['data'][0].Count;
          this.result = this.doctypeview['data'][0].data;
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
    getDoctypeView(page) {
      this.appspinner.spinnerAlert('show');      
      sessionStorage.setItem('doctypelist',page);
      this.service.doctypeListView(page).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        this.doctypeview = new DoctypeViewModel(res['error'],res['msg'], res['data']);
        if (res['data'].length > 0 && this.doctypeview['data'][0].data.length > 0) {
          this.pages = this.doctypeview['data'][0].Count;
          this.result = this.doctypeview['data'][0].data;
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
  