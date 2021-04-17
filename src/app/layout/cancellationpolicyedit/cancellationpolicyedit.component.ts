import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { CancellationpolicyeditService } from './cancellationpolicyedit.service';
import { CancellationPolicyEditModel } from './cancellationpolicyedit.model';

@Component({
  selector: 'app-cancellationpolicyedit',
  templateUrl: './cancellationpolicyedit.component.html',
  styleUrls: ['./cancellationpolicyedit.component.css']
})
export class CancellationpolicyeditComponent implements OnInit {

    paramsid: any;
    cancelEditForm:any;
    editcancel : CancellationPolicyEditModel;
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:CancellationpolicyeditService,
      private appspinner: AppComponent) {
        this.cancelEditForm = this.formBuilder.group({
          'UserType' : ['',[Validators.required,Validators.minLength(1)]],
          'Description' : ['',[Validators.required,Validators.minLength(1)]]
        });
       }
  
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.route.params.subscribe(params => {
        this.paramsid = params.id;           
      this.service.getcancellationpolicy(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        var rs = res.body['data'];
      this.editcancel = new CancellationPolicyEditModel(
          rs.Id,
          rs.UserType,
          rs.Description
        );
        this.cancelEditForm = this.formBuilder.group({
          'UserType' : [this.editcancel.UserType,[Validators.required,Validators.minLength(1)]],
          'Description' : [this.editcancel.Description,[Validators.required,Validators.minLength(1)]],
        });
      this.appspinner.spinnerAlert('hide'); 
      } 
      })    
    });
    }
    cancellationpolicyedit() {
      var Id = this.route.snapshot.params.id;
      if(this.cancelEditForm.valid) {
        this.editcancel = new CancellationPolicyEditModel(
          Id,
          this.cancelEditForm.value.UserType,
          this.cancelEditForm.value.Description,
          );
        this.service.cancellationpolicyEdit(this.editcancel).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.cancelEditForm.reset();
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
  
