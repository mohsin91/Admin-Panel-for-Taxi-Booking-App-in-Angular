import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehiclemodeladdService } from './vehiclemodeladd.service';
import { VehicleModelAddModel } from './vehiclemodeladd.model';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-vehiclemodeladd',
  templateUrl: './vehiclemodeladd.component.html',
  styleUrls: ['./vehiclemodeladd.component.css']
})
export class VehiclemodeladdComponent implements OnInit {
    returnUrl: any;
    vehiclemodelAddForm: any;
    vehiclemodeltype: VehicleModelAddModel;
    vehiclebrandlist : [];
  
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:VehiclemodeladdService,
      private appspinner: AppComponent) {
        this.vehiclemodelAddForm = this.formBuilder.group({
          'VehicleBrandId' : ['',[Validators.required,Validators.minLength(1)]],
          'ModelName' : ['',[Validators.required,Validators.minLength(1)]],
          'VehicleType' : ['',[Validators.required,Validators.minLength(1)]],
          'PowerBy' : ['',[Validators.required,Validators.minLength(1)]]
        });
       }
  
  
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.service.getvehiclebrand().subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
          this.vehiclebrandlist=res['body']['data'];
      }
      },
      (err) => {
        console.log(err);
      });
      this.appspinner.spinnerAlert('hide');
    }
    vehiclebrandadd() {
      if(this.vehiclemodelAddForm.valid) {
        var sF = this.vehiclemodelAddForm.value;
        this.vehiclemodeltype = new VehicleModelAddModel(
          sF.VehicleBrandId ,
          sF.ModelName,
          sF.VehicleType,
          sF.PowerBy
        )
        this.service.vehiclemodelAdd(this.vehiclemodeltype).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.vehiclemodelAddForm.reset();
                this.router.navigate(['vehicleModelView']);
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