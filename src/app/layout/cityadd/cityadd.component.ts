import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { CityAddModel } from './cityadd.model';
import { CityaddService } from './cityadd.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-cityadd',
  templateUrl: './cityadd.component.html',
  styleUrls: ['./cityadd.component.css']
})
export class CityaddComponent implements OnInit {
  returnUrl:string;
  cityAddForm:any;
  addcity : CityAddModel;
  countrylist : [];
  statelist : [];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:CityaddService,
    private appspinner: AppComponent) {
      this.cityAddForm = this.formBuilder.group({
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
        'StateId' : ['',[Validators.required,Validators.minLength(1)]],
        'CityName' : ['',[Validators.required,Validators.minLength(1)]],
        'Status' : ['']
      });
     }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.service.getcountry().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.countrylist=res['body']['data'];
        this.appspinner.spinnerAlert('hide');
      }
    },
    (err) => {
      console.log(err);
    })    
  }

  cityadd() {
    if(this.cityAddForm.dirty && this.cityAddForm.valid) {
      var status = '';
      if(this.cityAddForm.value.Status === true){
          status+='Yes';
      } else {
          status+='No';
      }
      this.addcity = new CityAddModel(this.cityAddForm.value.CountryId,
                                      this.cityAddForm.value.StateId,
                                      this.cityAddForm.value.CityName,
                                      status
                                      );
      this.service.cityAdd(this.addcity).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if(res.body['error'] === false ) {
          environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.router.navigate(['cityView']);
            }
            });
        } else {
          environment.swalalert('error',res.body['msg']);        
        }
      }
      });
    }     
     else {
      environment.swalalert('warning','Validation Required');
      }
}
getstate(id) {
  this.service.getstate(id).subscribe((res) => {
    if (res['error']) {
      environment.swalalert('nodata', res['msg']);
      this.appspinner.spinnerAlert('hide');
    } else {    
    this.statelist=res['body']['data'];
    }
},
(err) => {
  console.log(err);
})
}
}
