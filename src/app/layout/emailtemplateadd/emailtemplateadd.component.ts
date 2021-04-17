import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { EmailTemplateAddModel } from './emailtemplateadd.model';
import { EmailtemplateaddService } from './emailtemplateadd.service';

@Component({
  selector: 'app-emailtemplateadd',
  templateUrl: './emailtemplateadd.component.html',
  styleUrls: ['./emailtemplateadd.component.css']
})
export class EmailtemplateaddComponent implements OnInit {
  textareaCode: String;
  emailtemplateAddForm: any;
  addemail: EmailTemplateAddModel;
  public editorValue: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: EmailtemplateaddService,
    private appspinner: AppComponent) {
    this.emailtemplateAddForm = this.formBuilder.group({
      'KeyWord': ['', [Validators.required, Validators.minLength(1)]],
      'Type': ['', [Validators.required, Validators.minLength(1)]],
      'Template': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.appspinner.spinnerAlert('hide');
  }
  emailtemplateadd() {
    if (this.emailtemplateAddForm.dirty && this.emailtemplateAddForm.valid) {

      this.addemail = new EmailTemplateAddModel (
        this.emailtemplateAddForm.value.KeyWord,
        this.emailtemplateAddForm.value.Type,
        this.emailtemplateAddForm.value.Template
      )
      console.log(this.addemail);
      this.service.emailtemplateAdd(this.addemail).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if (res.body['error'] === false) {
          environment.swalalert('success', res.body['msg']).then(value => {
            if (value) {
              this.emailtemplateAddForm.reset();
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
  @ViewChild('iframe') iframe: ElementRef;
  setFrame() {
    let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    doc.open();
    doc.write(this.textareaCode);
    doc.close();
  }  
}


