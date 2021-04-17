import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { DoctypeEditModel } from './doctypeedit.model';
import { DoctypeeditService } from './doctypeedit.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-doctypeedit',
  templateUrl: './doctypeedit.component.html',
  styleUrls: ['./doctypeedit.component.css']
})
export class DoctypeeditComponent implements OnInit {
    returnUrl:string;
    doctypeEditForm:any;
    paramsid: any;
    editdoctype: DoctypeEditModel;
    typeid: any;
    type:any = [{id:1, name:'FILE'},{id:3, name:'TEXT'}];
    Applicable: any = [{ id : 1 , name : 'provider' } ,{id: 1 ,name: 'vehicle' },{id:3 , name: 'bank'} ];
    DocTypelist: any = [{ id : 1 , name : 'photo'},{ id : 1 , name :'card'},{ id : 1 , name :'doc'},{ id : 3 , name :'text'}];
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:DoctypeeditService,
      private appspinner: AppComponent
      ) {
       }
  
    ngOnInit() {
      this.appspinner.spinnerAlert('show');      
      this.route.params.subscribe(params => {
        this.paramsid = params.id;

      this.doctypeEditForm = this.formBuilder.group({
        'Name' : ['',[Validators.required,Validators.minLength(1)]],
        'Type' : ['',[Validators.required,Validators.minLength(1)]],
        'FieldName' : ['',[Validators.required,Validators.minLength(1)]],
        'ApplicableTo' : ['',[Validators.required,Validators.minLength(1)]],
        'DocType' : ['',[Validators.required,Validators.minLength(1)]],
        'IsRequired' : ['']
      });    
      this.service.getdoctype(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        var rs = res.body['data']; 
      this.editdoctype = new DoctypeEditModel(
          rs.Id,
          rs.Name,
          rs.Type,
          rs.FieldName,
          rs.ApplicableTo,
          rs.DocType,
          rs.IsRequired
        );         
        var tt = this.type.filter(x => x.name == this.editdoctype.Type);
        this.typeid = tt[0].id;
        if(this.editdoctype['IsRequired'] == 1) {
          this.editdoctype['IsRequired'] = true;
        } else {
          this.editdoctype['IsRequired'] = false;
        }
        this.doctypeEditForm = this.formBuilder.group({
          'Name' : [this.editdoctype.Name,[Validators.required,Validators.minLength(1)]],
          'Type' : [this.editdoctype.Type,[Validators.required,Validators.minLength(1)]],
          'FieldName' : [this.editdoctype.FieldName,[Validators.required,Validators.minLength(1)]],
          'ApplicableTo' : [this.editdoctype.ApplicableTo,[Validators.required,Validators.minLength(1)]],
          'DocType' : [this.editdoctype.DocType,[Validators.required,Validators.minLength(1)]],
          'IsRequired' : [this.editdoctype.IsRequired]
        });
        this.appspinner.spinnerAlert('hide');
      }
      })    
    });
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
    doctypeedit() {
      var Id = this.route.snapshot.params.id;
      if(this.doctypeEditForm.valid) {
        var status = 0;
        if(this.doctypeEditForm.value.IsRequired === true){
            status = 1;
        } else {
            status = 0;
        }
        var sF = this.doctypeEditForm.value;
        this.editdoctype = new DoctypeEditModel(
          Id,
          sF.Name,
          sF.Type,
          sF.FieldName,
          sF.ApplicableTo,
          sF.DocType,
          status
        )
        this.service.doctypeEdit(this.editdoctype).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.doctypeEditForm.reset();
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
  
