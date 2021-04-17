import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { CancellationPolicyAddModel } from './cancellationpolicyadd.model';
import { CancellationpolicyaddService } from './cancellationpolicyadd.service';

@Component({
  selector: 'app-cancellationpolicyadd',
  templateUrl: './cancellationpolicyadd.component.html',
  styleUrls: ['./cancellationpolicyadd.component.css']
})
export class CancellationpolicyaddComponent implements OnInit {
    cancellationpolicyAddForm:any;
    addcancellationpolicy : CancellationPolicyAddModel;
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:CancellationpolicyaddService,
      private appspinner: AppComponent
      ) {
        this.cancellationpolicyAddForm = this.formBuilder.group({
          'Description' : ['',[Validators.required,Validators.minLength(1)]],
          'UserType' : ['',[Validators.required,Validators.minLength(1)]]
        });
       }
  
    ngOnInit() {
  this.appspinner.spinnerAlert('show');
  this.appspinner.spinnerAlert('hide');
    }
    cancellationpolicyadd() {
      if(this.cancellationpolicyAddForm.dirty && this.cancellationpolicyAddForm.valid) {
        var sF = this.cancellationpolicyAddForm.value;
        this.addcancellationpolicy = new CancellationPolicyAddModel(
          sF.Description,
          sF.UserType
        );
        this.service.cancellationpolicyAdd(this.addcancellationpolicy).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.router.navigate(['cancellationPolicyView']);
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
  