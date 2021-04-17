import { Component, OnInit } from '@angular/core';
import { DoctypeAddModel } from './doctypeadd.model';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { DoctypeaddService } from './doctypeadd.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-doctypeadd',
  templateUrl: './doctypeadd.component.html',
  styleUrls: ['./doctypeadd.component.css']
})
export class DoctypeaddComponent implements OnInit {
  typeid: any;
  returnUrl: any;
  doctypeAddForm: any;
  doctype: DoctypeAddModel;
  type:any = [{id:1, name:'FILE'},{id:3, name:'TEXT'}];
  Applicable: any = [{ id : 1 , name : 'provider' } ,{id: 1 ,name: 'vehicle' },{id:3 , name: 'bank'} ];
  DocTypelist: any = [{ id : 1 , name : 'photo'},{ id : 1 , name :'card'},{ id : 1 , name :'doc'},{ id : 3 , name :'text'}];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:DoctypeaddService,
    private appspinner: AppComponent) {
      this.doctypeAddForm = this.formBuilder.group({
        'Name' : ['',[Validators.required,Validators.minLength(1)]],
        'Type' : ['',[Validators.required,Validators.minLength(1)]],
        'FieldName' : ['',[Validators.required,Validators.minLength(1)]],
        'ApplicableTo' : ['',[Validators.required,Validators.minLength(1)]],
        'DocType' : ['',[Validators.required,Validators.minLength(1)]],
        'IsRequired' : ['']
      });
     }

  ngOnInit() {    
      this.appspinner.spinnerAlert('show');
      this.appspinner.spinnerAlert('hide');
  }
  changetypeid(name) {
    var tt = this.type.filter(x => x.name == name );
    this.typeid = tt[0].id;
  }
  changeApplicable(id) {
    return this.Applicable.filter(x => x.id == id );
  }
  changeDocType(id) {
    return this.DocTypelist.filter(x => x.id == id );
  }
  doctypeadd() {
    if(this.doctypeAddForm.valid) {
      var IsRequired = 0;
      if(this.doctypeAddForm.value.IsRequired === true){
        IsRequired = 1;
      } else {
        IsRequired = 0;
      }
      var sF = this.doctypeAddForm.value;
      this.doctype = new DoctypeAddModel(
        sF.Name,
        sF.Type,
        sF.FieldName,
        sF.ApplicableTo,
        sF.DocType,
        IsRequired
      )
      this.service.doctypeAdd(this.doctype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if(res.body['error'] === false ) {
          environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.doctypeAddForm.reset();
              this.router.navigate(['doctypeView']);
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
