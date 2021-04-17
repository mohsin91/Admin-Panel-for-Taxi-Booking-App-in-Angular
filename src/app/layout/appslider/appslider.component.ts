import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from, empty } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { AppsliderService } from './appslider.service';
import { AppSliderAddModel } from './appSlideradd.model';

@Component({
  selector: 'app-appslider',
  templateUrl: './appslider.component.html',
  styleUrls: ['./appslider.component.css']
})
export class AppsliderComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  appsliderAddForm: any;
  imagefile: File[];
  files: any;
  imagefilename: any;
  appslidermodel: AppSliderAddModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: AppsliderService,
    private appspinner: AppComponent) {
    this.appsliderAddForm = this.formBuilder.group({
      'Title': ['', [Validators.required, Validators.minLength(1)]],
      'Description': ['', [Validators.required, Validators.minLength(1)]],
      'file': ['', [Validators.required]],
      'Type': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.appspinner.spinnerAlert('hide');
  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagefilename = reader.result;
      reader.readAsDataURL(file);
    }
  }
  appslideradd() {

    this.imagefile = this.img.nativeElement.files;
    if (this.appsliderAddForm.dirty && this.appsliderAddForm.valid) {
      var sF = this.appsliderAddForm.value;
      this.service.fileupload(this.imagefile, sF.Type).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        if (res.body['error'] === false) {
          this.appslidermodel = new AppSliderAddModel(
            sF.Title,
            sF.Description,
            res.body['data'],
            sF.Type
          );
          this.service.appslideradd(this.appslidermodel).subscribe((res) => {
            if (res.body['error'] === false) {
              environment.swalalert('success', res.body['msg']).then(value => {
                if (value) {
                  this.router.navigate(['appSliderView']);
                }
              });
            } else {
              environment.swalalert('error', res.body['msg']);
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
