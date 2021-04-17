import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { CountryAddModel } from './countryadd.model';
import { CountryaddService } from './countryadd.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-countryadd',
  templateUrl: './countryadd.component.html',
  styleUrls: ['./countryadd.component.css']
})
export class CountryaddComponent implements OnInit {
  returnUrl:string;
  countryAddForm:any;
  addcountry : CountryAddModel;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:CountryaddService,
    private appspinner: AppComponent
    ) {
      this.countryAddForm = this.formBuilder.group({
        'CountryName' : ['',[Validators.required,Validators.minLength(1)]],
        'ShortCode' : ['',[Validators.required,Validators.minLength(1)]],
        'CurrenyName' : ['',[Validators.required,Validators.minLength(1)]],
        'CurrencyShortCode' : ['',[Validators.required,Validators.minLength(1)]],
        'CurrencySymbol' : ['',[Validators.required,Validators.minLength(1)]],
        'CurrenyValue' : ['',[Validators.required,Validators.minLength(1)]],
        'Status' : ['']
      });
     }

  ngOnInit() {
this.appspinner.spinnerAlert('show');
this.appspinner.spinnerAlert('hide');
  }
  countryadd() {
    if(this.countryAddForm.dirty && this.countryAddForm.valid) {
      var status = '';
      if(this.countryAddForm.value.Status === true){
          status+='Yes';
      } else {
          status+='No';
      }
      var sF = this.countryAddForm.value;
      this.addcountry = new CountryAddModel(
        sF.CountryName,
        sF.ShortCode,
        sF.CurrenyName,
        sF.CurrencyShortCode,
        sF.CurrencySymbol,
        sF.CurrenyValue,
        status
      )
      this.service.countryAdd(this.addcountry).subscribe(res => {
        if(res.body['error'] === false ) {
          environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.router.navigate(['countryView']);
            }
            });
        } else {
          environment.swalalert('error',res.body['msg']);        
        }
      });
    }     
     else {
      environment.swalalert('warning','Validation Required');      
      }
}
}
