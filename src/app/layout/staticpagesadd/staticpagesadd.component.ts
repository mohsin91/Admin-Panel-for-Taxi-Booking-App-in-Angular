import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { StaticPagesAddModel } from './staticpagesadd.model';
import { StaticpagesaddService } from './staticpagesadd.service';

@Component({
  selector: 'app-staticpagesadd',
  templateUrl: './staticpagesadd.component.html',
  styleUrls: ['./staticpagesadd.component.css']
})
export class StaticpagesaddComponent implements OnInit {
    textareaCode: String;
    staticpageAddForm:any;
    addstatic : StaticPagesAddModel;
    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:StaticpagesaddService,
      private appspinner: AppComponent) {
        this.staticpageAddForm = this.formBuilder.group({
          'PageName' : ['',[Validators.required,Validators.minLength(1)]],
          'Url' : ['',[Validators.required,Validators.minLength(1)]],
          'HtmlContent' : ['',[Validators.required,Validators.minLength(1)]],
        });
       }
  
    ngOnInit() {
      this.appspinner.spinnerAlert('show');
      this.appspinner.spinnerAlert('hide');
    }
    staticadd() {
      if(this.staticpageAddForm.dirty && this.staticpageAddForm.valid) {

        this.addstatic = new StaticPagesAddModel(
          this.staticpageAddForm.value.PageName,
          this.staticpageAddForm.value.Url,
          this.staticpageAddForm.value.HtmlContent
        )
        this.service.staticpagesAdd(this.addstatic).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
                environment.swalalert('success',res.body['msg']).then(value => {
                  if(value) {
                    this.staticpageAddForm.reset();
                    this.router.navigate(['staticPagesView']);
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
  @ViewChild('iframe') iframe: ElementRef;
  setFrame() {
    let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    doc.open();
    doc.write(this.textareaCode);
    doc.close();
  }

  }
  
