import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { StateeditService } from './stateedit.service';
import { StateEditModel } from './stateedit.model';
import { CountryList } from '../countryview/countrylist.model';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-stateedit',
  templateUrl: './stateedit.component.html',
  styleUrls: ['./stateedit.component.css']
})
export class StateeditComponent implements OnInit {
    returnUrl:string;
    stateEditForm:any;
    paramsid: any;
    countrylist: [];
    editstate: StateEditModel;
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:StateeditService,
      private appspinner: AppComponent
      ) {
       }
  
    ngOnInit() { 
      this.appspinner.spinnerAlert('show');
      this.route.params.subscribe(params => {
        this.paramsid = params.id;
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
      this.stateEditForm = this.formBuilder.group({
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
        'ShortCode' : ['',[Validators.required,Validators.minLength(1)]],
        'StateName' : ['',[Validators.required,Validators.minLength(1)]],
        'Status' : ['']
      });          
      this.service.getstate(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        var rs = res.body['data']; 
      this.editstate = new StateEditModel(
          rs.Id,
          rs.CountryId,
          rs.ShortCode,
          rs.StateName,
          rs.IsActive
        );
        if(this.editstate['IsActive'] == 'Yes') {
          this.editstate['IsActive'] = true;
        } else {
          this.editstate['IsActive'] = false;
        }
        this.stateEditForm = this.formBuilder.group({
          'CountryId' : [this.editstate.CountryId,[Validators.required,Validators.minLength(1)]],
          'ShortCode' : [this.editstate.ShortCode,[Validators.required,Validators.minLength(1)]],
          'StateName' : [this.editstate.StateName,[Validators.required,Validators.minLength(1)]],        
          'Status' : [this.editstate.IsActive]
        });
        this.appspinner.spinnerAlert('hide');    
      }
      })    
    });    
    }
    stateedit() {
      var Id = this.route.snapshot.params.id;
      if(this.stateEditForm.valid) {
        var status = '';
        if(this.stateEditForm.value.Status === true){
            status+='Yes';
        } else {
            status+='No';
        }
        var sF = this.stateEditForm.value;
        this.editstate = new StateEditModel(
          Id,
          sF.CountryId,
          sF.ShortCode,
          sF.StateName,
          status
        )
        this.service.stateEdit(this.editstate).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {         
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.stateEditForm.reset();
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
  