import { Component, ElementRef, ViewChild , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { ValidationService } from 'src/app/login/validation.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { StaticPagesEditModel } from './staticpagesedit.model';
import { StaticpageseditService } from './staticpagesedit.service';

@Component({
  selector: 'app-staticpagesedit',
  templateUrl: './staticpagesedit.component.html',
  styleUrls: ['./staticpagesedit.component.css']
})
export class StaticpageseditComponent implements OnInit {
      textareaCode: String;
      paramsid: any;
      staticpageEditForm: any;
      editstatic : StaticPagesEditModel;
      constructor(
        private formBuilder:FormBuilder,
        private router:Router,
        private route:ActivatedRoute,
        private guard:GuardGuard,
        private encry:EncryService,
        private service:StaticpageseditService,
        private appspinner: AppComponent
        ) {
        this.staticpageEditForm = this.formBuilder.group({
          'PageName': ['', [Validators.required, Validators.minLength(1)]],
          'Url': ['', [Validators.required, Validators.minLength(1)]],
          'HtmlContent': ['', [Validators.required, Validators.minLength(1)]],
        });
         }
    
      ngOnInit() { 
        this.appspinner.spinnerAlert('show');
        this.route.params.subscribe(params => {
          this.paramsid = params.id;       
        this.service.getstaticpages(this.paramsid).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          var rs = res.body['data']; 
        this.editstatic = new StaticPagesEditModel(
            rs.Id,
            rs.PageName,
            rs.Url,
            rs.HtmlContent
          );          
          this.textareaCode = this.editstatic.HtmlContent;
          this.staticpageEditForm = this.formBuilder.group({
            'PageName': [this.editstatic.PageName, [Validators.required, Validators.minLength(1)]],
            'Url': [this.editstatic.Url, [Validators.required, Validators.minLength(1)]],
            'HtmlContent': [this.textareaCode, [Validators.required, Validators.minLength(1)]],
          });
          this.setFrame();
          this.appspinner.spinnerAlert('hide');    
        }
        })    
      });    
      }
      staticpageedit() {
        var Id = this.route.snapshot.params.id;
        if(this.textareaCode !== '') {
          this.editstatic = new StaticPagesEditModel(
            Id,
            this.staticpageEditForm.value.PageName,
            this.staticpageEditForm.value.Url,
            this.staticpageEditForm.value.HtmlContent
          );
          this.service.staticpagesEdit(this.editstatic).subscribe(res => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {            
            if(res.body['error'] === false ) {
              environment.swalalert('success',res.body['msg']).then(value => {
                if(value) {
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
    let doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    doc.open();
    doc.write(this.textareaCode);
    doc.close();
  }
  
}
