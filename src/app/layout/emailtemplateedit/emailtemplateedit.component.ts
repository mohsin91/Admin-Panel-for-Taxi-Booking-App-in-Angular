import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { EmailTemplateEditModel } from './emailtemplateedit.model';
import { EmailtemplateeditService } from './emailtemplateedit.service';

@Component({
  selector: 'app-emailtemplateedit',
  templateUrl: './emailtemplateedit.component.html',
  styleUrls: ['./emailtemplateedit.component.css']
})
export class EmailtemplateeditComponent implements OnInit {
  emailtemplateEditForm: any;
  paramsid: any;
  editemail: EmailTemplateEditModel;
  public editorValue: any;  
  variableData: any;
  Type: any;
  KeyWord: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: EmailtemplateeditService,
    private appspinner: AppComponent
  ) {
    this.emailtemplateEditForm = this.formBuilder.group({
      'KeyWord': ['', [Validators.required, Validators.minLength(1)]],
      'Type': ['', [Validators.required, Validators.minLength(1)]],
      'Template': ['', [Validators.required, Validators.minLength(1)]]
    });    
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getemailtemplatepages(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        var rs = res.body['data'];
        this.editemail = new EmailTemplateEditModel(
          rs.Id,
          rs.KeyWord,
          rs.Type,
          rs.Template,
          rs.Variables
        );
        this.variableData = this.editemail.Variables;
        this.editorValue = this.editemail.Template;
        this.KeyWord = this.editemail.KeyWord;
        this.Type = this.editemail.Type;
        this.emailtemplateEditForm = this.formBuilder.group({
          'KeyWord': [this.editemail.KeyWord, [Validators.required, Validators.minLength(1)]],
          'Type': [this.editemail.Type, [Validators.required, Validators.minLength(1)]],
          'Template': [[Validators.required, Validators.minLength(1)]]
        });         
        this.appspinner.spinnerAlert('hide');
      }
      })
    });
  }
  emailtemplateedit() {
    var Id = this.route.snapshot.params.id;
    if (this.KeyWord && this.Type && this.editorValue) {

      this.editemail = new EmailTemplateEditModel(
        Id,
        this.KeyWord,
        this.Type,
        this.editorValue,
        ''
      );
      this.service.emailtemplateEdit(this.editemail).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if (res.body['error'] === false) {
          environment.swalalert('success', res.body['msg']).then(value => {
            if (value) {
              this.router.navigate(['emailTemplateView']);
            }
          });
        } else {
          environment.swalalert('error', res.body['msg']);
        }
      }
      });
    }
    else {
      environment.swalalert('warning', 'Validation Required');
    }
  }

}

