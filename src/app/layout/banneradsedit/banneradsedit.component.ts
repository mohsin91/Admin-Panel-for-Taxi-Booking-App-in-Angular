import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { BannerAdsEditModel } from './banneredit.model';
import { BanneradseditService } from './banneradsedit.service';


@Component({
  selector: 'app-banneradsedit',
  templateUrl: './banneradsedit.component.html',
  styleUrls: ['./banneradsedit.component.css']
})
export class BanneradseditComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  paramsid: any;
  imagefile: File[];
  files: any;
  filename: any;
  imagefilename: any;
  banneradsEditForm: any;
  imageSrc: any;
  editbannerads: BannerAdsEditModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: BanneradseditService,
    private appspinner: AppComponent) {
    this.banneradsEditForm = this.formBuilder.group({
      'Title': ['', [Validators.required, Validators.minLength(1)]],
      'Description': ['', [Validators.required, Validators.minLength(1)]],
      'file': ['', [Validators.required]],
      'Url': ['', [Validators.required, Validators.minLength(1)]],
      'IsActive': ['']
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getbanneradsdata(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          var rs = res.body['data'];
          var status;
          if (rs.Status === 'Active') {
            status = true;
          } else {
            status = false;
          }          
          this.editbannerads = new BannerAdsEditModel(
            rs.Id,
            rs.Title,
            rs.Description,
            rs.Image_path,
            rs.Url,
            status
          );
          this.imagefilename = rs.Image_path;
          this.filename = rs.Image_path.split('/').reverse()[0];
          this.banneradsEditForm = this.formBuilder.group({
            'Title': [this.editbannerads.Title, [Validators.required, Validators.minLength(1)]],
            'Description': [this.editbannerads.Description, [Validators.required, Validators.minLength(1)]],
            'file': [''],
            'Url': [this.editbannerads.Url, [Validators.required, Validators.minLength(1)]],
            'IsActive': [this.editbannerads.Status]
          });
          this.appspinner.spinnerAlert('hide');
        }
      })
    });
  }

  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagefilename = reader.result;
      reader.readAsDataURL(file);
    }
  }

  appslideredit() {
    var Id = this.route.snapshot.params.id;
    this.imagefile = this.img.nativeElement.files;

    if (this.banneradsEditForm.valid) {
      if (this.imagefile.length > 0) {
      this.service.fileupload(this.imagefile, 'banner', this.filename).subscribe((res) => {
        if (res.body['error'] === false) {
          var status = '';
          if (this.banneradsEditForm.value.IsActive === true) {
            status += 'Active';
          } else {
            status += 'InActive';
          }          
          this.editbannerads = new BannerAdsEditModel(
            Id,
            this.banneradsEditForm.value.Title,
            this.banneradsEditForm.value.Description,
            res.body['data'],
            this.banneradsEditForm.value.Url,
            status
          );
          this.service.bannerAdsEdit(this.editbannerads).subscribe(res => {
            if (res.body['error'] === false) {
              environment.swalalert('success', res.body['msg']).then(value => {
                if (value) {
                  this.banneradsEditForm.reset();
                  this.router.navigate(['bannerads']);
                }
              });
            } else {
              environment.swalalert('error', res.body['msg']);
            }
          });          

        }
        else {
          environment.swalalert('error', res.body['msg']);
        }
      });


      } else {
        var status = '';
        if (this.banneradsEditForm.value.IsActive === true) {
          status += 'Active';
        } else {
          status += 'InActive';
        }
        this.editbannerads = new BannerAdsEditModel(
          Id,
          this.banneradsEditForm.value.Title,
          this.banneradsEditForm.value.Description,
          this.imagefilename,
          this.banneradsEditForm.value.Url,
          status
        );
        this.service.bannerAdsEdit(this.editbannerads).subscribe(res => {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.banneradsEditForm.reset();
                this.router.navigate(['bannerads']);
              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        });        

      }      



    }
    else {
      environment.swalalert('warning', 'Validation Required');
    }
  }
}


