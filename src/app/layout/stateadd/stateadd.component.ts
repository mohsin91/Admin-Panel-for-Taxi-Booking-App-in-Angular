import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { StateaddService } from './stateadd.service';
import { StateAddModel } from './stateadd.model';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-stateadd',
  templateUrl: './stateadd.component.html',
  styleUrls: ['./stateadd.component.css']
})
export class StateaddComponent implements OnInit {
  returnUrl:string;
  stateAddForm:any;
  addstate : StateAddModel;
  countrylist : [];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:StateaddService,
    private appspinner: AppComponent) {
      this.stateAddForm = this.formBuilder.group({
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
        'ShortCode' : ['',[Validators.required,Validators.minLength(1)]],
        'StateName' : ['',[Validators.required,Validators.minLength(1)]],
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
    }
    },
    (err) => {
      console.log(err);
    })
    this.appspinner.spinnerAlert('hide');
  }
  stateadd() {
    if(this.stateAddForm.dirty && this.stateAddForm.valid) {
      var status = '';
      if(this.stateAddForm.value.Status === true){
          status+='Yes';
      } else {
          status+='No';
      }
      this.addstate = new StateAddModel(
        this.stateAddForm.value.CountryId,
        this.stateAddForm.value.ShortCode,
        this.stateAddForm.value.StateName,
        status
      )
      this.service.stateAdd(this.addstate).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if(res.body['error'] === false ) {
              environment.swalalert('success',res.body['msg']).then(value => {
                if(value) {
                  this.stateAddForm.reset();
                  this.router.navigate(['stateView']);
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
}
