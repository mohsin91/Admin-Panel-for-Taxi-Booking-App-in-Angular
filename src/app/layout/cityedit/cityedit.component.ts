import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { CityEditModel } from './cityedit.model';
import { CityeditService } from './cityedit.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cityedit',
  templateUrl: './cityedit.component.html',
  styleUrls: ['./cityedit.component.css']
})
export class CityeditComponent implements OnInit {
    paramsid: any;
    cityEditForm:any;
    editcity : CityEditModel;
    countrylist : [];
    statelist : [];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:CityeditService,
      private appspinner: AppComponent) {
       }
  
    ngOnInit() {
      this.cityEditForm = this.formBuilder.group({
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
        'StateId' : ['',[Validators.required,Validators.minLength(1)]],
        'CityName' : ['',[Validators.required,Validators.minLength(1)]],
        'Status' : ['']
      });
      this.appspinner.spinnerAlert('show');
      this.route.params.subscribe(params => {
        this.paramsid = params.id;
      this.service.getcountry().subscribe((res) => {
        this.countrylist=res['body']['data'];
    },
    (err) => {
      console.log(err);
    })    
      this.cityEditForm = this.formBuilder.group({
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
        'StateId' : ['',[Validators.required,Validators.minLength(1)]],
        'CityName' : ['',[Validators.required,Validators.minLength(1)]],
        'Status' : ['']
      });          
      this.service.getcity(this.paramsid).subscribe((res) => {
        var rs = res.body['data'];
      this.getstate(rs.CountryId);
      this.editcity = new CityEditModel(
          rs.Id,
          rs.CountryId,
          rs.StateId,
          rs.CityName,
          rs.IsActive
        );
        if(this.editcity['IsActive'] == 'Yes') {
          this.editcity['IsActive'] = true;
        } else {
          this.editcity['IsActive'] = false;
        }
        this.cityEditForm = this.formBuilder.group({
          'CountryId' : [this.editcity.CountryId,[Validators.required,Validators.minLength(1)]],
          'StateId' : [this.editcity.StateId,[Validators.required,Validators.minLength(1)]],
          'CityName' : [this.editcity.CityName,[Validators.required,Validators.minLength(1)]],        
          'Status' : [this.editcity.IsActive]
        });
      this.appspinner.spinnerAlert('hide');  
      })    
    });
    }
  
    cityedit() {
      var Id = this.route.snapshot.params.id;
      if(this.cityEditForm.valid) {
        var status = '';
        if(this.cityEditForm.value.Status === true){
            status+='Yes';
        } else {
            status+='No';
        }
        this.editcity = new CityEditModel(
          Id,
          this.cityEditForm.value.CountryId,
          this.cityEditForm.value.StateId,
          this.cityEditForm.value.CityName,
          status
          );
        this.service.cityEdit(this.editcity).subscribe(res => {
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.cityEditForm.reset();
                this.router.navigate(['cityView']);
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
  getstate(id) {
    this.service.getstate(id).subscribe((res) => {
      this.statelist=res['body']['data'];
  },
  (err) => {
    console.log(err);
  })
  }
  }
  
