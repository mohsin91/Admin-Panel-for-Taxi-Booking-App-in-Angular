import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { CountryeditService } from './countryedit.service';
import { CountryEditModel } from './countryedit.model';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-countryedit',
  templateUrl: './countryedit.component.html',
  styleUrls: ['./countryedit.component.css']
})
export class CountryeditComponent implements OnInit {
  returnUrl:string;
  countryEditForm:any;
  paramsid: any;
  editcountry: CountryEditModel;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:CountryeditService,
    private appspinner: AppComponent
    ) {
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
    this.countryEditForm = this.formBuilder.group({
      'CountryName' : ['',[Validators.required,Validators.minLength(1)]],
      'ShortCode' : ['',[Validators.required,Validators.minLength(1)]],
      'CurrenyName' : ['',[Validators.required,Validators.minLength(1)]],
      'CurrencyShortCode' : ['',[Validators.required,Validators.minLength(1)]],
      'CurrencySymbol' : ['',[Validators.required,Validators.minLength(1)]],
      'CurrenyValue' : ['',[Validators.required,Validators.minLength(1)]],
      'Status' : ['']
    });    
    this.appspinner.spinnerAlert('show');
    this.service.getcountry(this.paramsid).subscribe((res) => {
      var rs = res.body['data']; 
    this.editcountry = new CountryEditModel(
        rs.Id,
        rs.CountryName,
        rs.ShortCode,
        rs.CurrenyName,
        rs.CurrencyShortCode,
        rs.CurrencySymbol,
        rs.CurrenyValue,
        rs.IsActive
      );
      if(this.editcountry['IsActive'] == 'Yes') {
        this.editcountry['IsActive'] = true;
      } else {
        this.editcountry['IsActive'] = false;
      }
      this.countryEditForm = this.formBuilder.group({
        'CountryName' : [this.editcountry.CountryName,[Validators.required,Validators.minLength(1)]],
        'ShortCode' : [this.editcountry.ShortCode,[Validators.required,Validators.minLength(1)]],
        'CurrenyName' : [this.editcountry.CurrenyName,[Validators.required,Validators.minLength(1)]],
        'CurrencyShortCode' : [this.editcountry.CurrencyShortCode,[Validators.required,Validators.minLength(1)]],
        'CurrencySymbol' : [this.editcountry.CurrencySymbol,[Validators.required,Validators.minLength(1)]],
        'CurrenyValue' : [this.editcountry.CurrenyValue,[Validators.required,Validators.minLength(1)]],
        'Status' : [this.editcountry.IsActive]
      });
    this.appspinner.spinnerAlert('hide');  
    })    
  });    
  }
  countryedit() {
    var Id = this.route.snapshot.params.id;
    if(this.countryEditForm.valid) {
      var status = '';
      if(this.countryEditForm.value.Status === true){
          status+='Yes';
      } else {
          status+='No';
      }
      var sF = this.countryEditForm.value;
      this.editcountry = new CountryEditModel(
        Id,
        sF.CountryName,
        sF.ShortCode,
        sF.CurrenyName,
        sF.CurrencyShortCode,
        sF.CurrencySymbol,
        sF.CurrenyValue,
        status
      )
      this.service.countryEdit(this.editcountry).subscribe(res => {
        if(res.body['error'] === false ) {
          environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.countryEditForm.reset();
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
