import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { AppConfigAddModel } from './appconfigadd.model';
import { AppconfigService } from './appconfig.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-appconfig',
  templateUrl: './appconfig.component.html',
  styleUrls: ['./appconfig.component.css']
})
export class AppconfigComponent implements OnInit {
    typeid: any;
    returnUrl: any;
    uauthAddForm: any;
    uotpAddForm: any;
    umapAddForm: any;
    pauthAddForm: any;
    potpAddForm: any;
    pmapAddForm: any;
    usertype: AppConfigAddModel;
    providertype: AppConfigAddModel;
    authtype : String = 'AUTH_TYPE';
    otptype : String = 'OTP_TIMER';
    mapapikey : String = 'MAP_API_KEY';   
    statustype: String;
    status: string; 
    name: any;

    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:AppconfigService) {
        this.uauthAddForm = this.formBuilder.group({
          'authvalue' : ['']
        });
        this.uotpAddForm = this.formBuilder.group({
          'otpvalue' : ['',[Validators.required,Validators.minLength(1)]]
        });
        this.umapAddForm = this.formBuilder.group({
          'mapvalue' : ['',[Validators.required,Validators.minLength(1)]]
        });
        this.pauthAddForm = this.formBuilder.group({
          'authvalue' : ['']
        });
        this.potpAddForm = this.formBuilder.group({
          'otpvalue' : ['',[Validators.required,Validators.minLength(1)]]
        });
        this.pmapAddForm = this.formBuilder.group({
          'mapvalue' : ['',[Validators.required,Validators.minLength(1)]]
        });                
       }
  
    ngOnInit() {    

    }
    resetChange(data) {
      if(data === 'user') {
        this.uauthAddForm.reset();
        this.uotpAddForm.reset();
        this.umapAddForm.reset();
      } else {
        this.pauthAddForm.reset();
        this.potpAddForm.reset();
        this.pmapAddForm.reset();        
      }
    }
    serviceadd(sF) {
        this.usertype = new AppConfigAddModel(
          sF.fieldname,
          sF.value,
          sF.who,
        )
        this.service.appconfigEdit(this.usertype).subscribe(res => {
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.router.navigate(['appConfig']);
              }
              });
          } else {
            environment.swalalert('error',res.body['msg']);
          }
        });      
    }
    
    appconfigadd(name) {
      switch(name) { 
        case 'uauthAddForm': {
        if(this.uauthAddForm.value.authvalue === true){
          this.status = 'PWD';
        } else {
          this.status = 'OTP';
        }
        var sF : {[k:string]:any} = {} ;
        sF.fieldname = this.authtype;
        sF.value = this.status;
        sF.who = 'user';
        this.serviceadd(sF);
        this.uauthAddForm.reset();
        break;
        } 
        case 'uotpAddForm': { 
          var sF : {[k:string]:any} = {} ;
          sF.fieldname = this.otptype;
          sF.value = this.uotpAddForm.value.otpvalue;
          sF.who = 'user';          
          this.serviceadd(sF);
          this.uotpAddForm.reset();
          break;
        }
        case 'umapAddForm': { 
          var sF : {[k:string]:any} = {} ;
          sF.fieldname = this.mapapikey;
          sF.value = this.umapAddForm.value.mapvalue;
          sF.who = 'user';
          this.serviceadd(sF);
          this.umapAddForm.reset();
          break;
        }
        case 'pauthAddForm': {
          if(this.pauthAddForm.value.authvalue === true){
            this.status = 'PWD';
          } else {
            this.status = 'OTP';
          }
          var sF : {[k:string]:any} = {} ;
          sF.fieldname = this.authtype;
          sF.value = this.status;
          sF.who = 'provider';
          this.serviceadd(sF);
          this.pauthAddForm.reset();
            break;
          } 
          case 'potpAddForm': { 
            var sF : {[k:string]:any} = {} ;
            sF.fieldname = this.otptype;
            sF.value = this.potpAddForm.value.otpvalue;
            sF.who = 'provider';          
            this.serviceadd(sF);
            this.potpAddForm.reset();
            break;
          }
          case 'pmapAddForm': { 
            var sF : {[k:string]:any} = {} ;
            sF.fieldname = this.mapapikey;
            sF.value = this.pmapAddForm.value.mapvalue;
            sF.who = 'provider';
            this.serviceadd(sF);
            this.pmapAddForm.reset();
            break;
          }                 
        default: { 
          environment.swalalert('error','Error');          
        } 
     }       
     
      }
  }
  