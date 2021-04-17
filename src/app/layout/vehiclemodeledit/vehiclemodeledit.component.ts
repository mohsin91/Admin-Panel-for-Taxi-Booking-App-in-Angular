import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehicleModelEditModel } from './vehiclemodeledit.model';
import { VehiclemodeleditService } from './vehiclemodeledit.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-vehiclemodeledit',
  templateUrl: './vehiclemodeledit.component.html',
  styleUrls: ['./vehiclemodeledit.component.css']
})
export class VehiclemodeleditComponent implements OnInit {
    returnUrl: any;
    vehiclemodelEditForm: any;
    vehiclemodeltype: VehicleModelEditModel;
    vehiclebrandlist : [];
    paramsid: any;
  
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:VehiclemodeleditService,
      private appspinner: AppComponent) {
        this.vehiclemodelEditForm = this.formBuilder.group({
          'VehicleBrandId' : ['',[Validators.required,Validators.minLength(1)]],
          'ModelName' : ['',[Validators.required,Validators.minLength(1)]],
          'VehicleType' : ['',[Validators.required,Validators.minLength(1)]],
          'PowerBy' : ['',[Validators.required,Validators.minLength(1)]]
        });
       }
  
  
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.route.params.subscribe(params => {         
        this.paramsid = params.id;
        this.service.getvehiclemodel(this.paramsid).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          var rs = res.body['data']; 
        this.vehiclemodeltype = new VehicleModelEditModel(
            rs.Id,
            rs.VehicleBrandId,
            rs.ModelName,
            rs.VehicleType,
            rs.PowerBy
          );   
          this.vehiclemodelEditForm = this.formBuilder.group({
            'VehicleBrandId' : [this.vehiclemodeltype.VehicleBrandId,[Validators.required,Validators.minLength(1)]],
            'ModelName' : [this.vehiclemodeltype.ModelName,[Validators.required,Validators.minLength(1)]],
            'VehicleType' : [this.vehiclemodeltype.VehicleType,[Validators.required,Validators.minLength(1)]],
            'PowerBy' : [this.vehiclemodeltype.PowerBy,[Validators.required,Validators.minLength(1)]]
          });
        }          
      });      
    });      
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
      })    
      this.appspinner.spinnerAlert('hide');
    }
    vehiclebrandedit() {
      if(this.vehiclemodelEditForm.valid) {
        var sF = this.vehiclemodelEditForm.value;
        this.vehiclemodeltype = new VehicleModelEditModel(
          this.paramsid,
          sF.VehicleBrandId,
          sF.ModelName,
          sF.VehicleType,
          sF.PowerBy
        )
        this.service.vehiclemodelEdit(this.vehiclemodeltype).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.vehiclemodelEditForm.reset();
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