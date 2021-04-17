import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehicleBrandAddModel } from './vehiclebrandadd.model';
import { VehiclebrandaddService } from './vehiclebrandadd.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-vehiclebrandadd',
  templateUrl: './vehiclebrandadd.component.html',
  styleUrls: ['./vehiclebrandadd.component.css']
})
export class VehiclebrandaddComponent implements OnInit {
  returnUrl: any;
  vehiclebrandAddForm: any;
  vehiclebrandtype: VehicleBrandAddModel;
  countrylist : [];
  cdropdownList = [];
  cselectedItems = [];
  cdropdownSettings = {};

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:VehiclebrandaddService,
    private appspinner: AppComponent) {
      this.vehiclebrandAddForm = this.formBuilder.group({
        'BrandName' : ['',[Validators.required,Validators.minLength(1)]],
        'CountryId' : ['',[Validators.required,Validators.minLength(1)]]
      });
     }


  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.cdropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'CountryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 'All',
      allowSearchFilter: true
    };     
    this.service.getcountry().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {      
      var countrylst = [];
      res['body']['data'].filter((x) => {
        countrylst.push({ Id: x['Id'], CountryName: x['CountryName'] });
      });
      this.cdropdownList = countrylst;
    }
    },
    (err) => {
      console.log(err);
    })    
    this.appspinner.spinnerAlert('hide');
  }
  vehiclebrandadd() {
    var countryid = [];
    if(this.vehiclebrandAddForm.valid) {
      var IsRequired = 0;
      if(this.vehiclebrandAddForm.value.IsRequired === true){
        IsRequired = 1;
      } else {
        IsRequired = 0;
      }
      var sF = this.vehiclebrandAddForm.value;
      sF.CountryId.filter(x => {
        countryid.push(x['Id']);
      })
      this.vehiclebrandtype = new VehicleBrandAddModel(
        sF.BrandName,
        '[' + countryid + ']'
      )
      this.service.vehiclebrandAdd(this.vehiclebrandtype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if(res.body['error'] === false ) {
          environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.vehiclebrandAddForm.reset();
              this.router.navigate(['vehicleBrandView']);
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