import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from, empty } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { BannerAdsAddModel } from './banneradd.model';
import { BanneradsaddService } from './banneradsadd.service';

@Component({
  selector: 'app-banneradsadd',
  templateUrl: './banneradsadd.component.html',
  styleUrls: ['./banneradsadd.component.css']
})
export class BanneradsaddComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  banneradsAddForm: any;
  imagefile: File[];
  files: any;
  imagefilename: any;
  banneradsmodel: BannerAdsAddModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: BanneradsaddService,
    private appspinner: AppComponent) {
    this.banneradsAddForm = this.formBuilder.group({
      'Title': ['', [Validators.required, Validators.minLength(1)]],
      'Description': ['', [Validators.required, Validators.minLength(1)]],
      'file': ['', [Validators.required]],
      'Url': ['', [Validators.required, Validators.minLength(1)]],
      'IsActive': ['']
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
    if (this.banneradsAddForm.valid) {
      var sF = this.banneradsAddForm.value;
      this.service.fileupload(this.imagefile, 'banner').subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          var status = '';
          if (sF.IsActive === true) {
            status += 'Active';
          } else {
            status += 'InActive';
          }          
          if (res.body['error'] === false) {
            this.banneradsmodel = new BannerAdsAddModel(
              sF.Title,
              sF.Description,
              res.body['data'],
              sF.Url,
              status
            );
            this.service.banneradsadd(this.banneradsmodel).subscribe((res) => {
              if (res.body['error'] === false) {
                environment.swalalert('success', res.body['msg']).then(value => {
                  if (value) {
                    this.router.navigate(['bannerads']);
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
