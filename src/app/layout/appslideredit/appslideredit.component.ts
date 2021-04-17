import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { AppSliderEditModel } from './appSlideredit.model';
import { AppslidereditService } from './appslideredit.service';

@Component({
  selector: 'app-appslideredit',
  templateUrl: './appslideredit.component.html',
  styleUrls: ['./appslideredit.component.css']
})
export class AppslidereditComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  paramsid: any;
  imagefile: File[];
  files: any;
  filename: any;
  imagefilename: any;
  appSliderEditForm: any;
  imageSrc: any;
  editappslider: AppSliderEditModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: AppslidereditService,
    private appspinner: AppComponent) {
    this.appSliderEditForm = this.formBuilder.group({
      'Title': ['', [Validators.required, Validators.minLength(1)]],
      'Description': ['', [Validators.required, Validators.minLength(1)]],
      'file': [''],
      'Type': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getappSlider(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {        
        var rs = res.body['data'];
        this.editappslider = new AppSliderEditModel(
          rs.Id,
          rs.Title,
          rs.Description,
          rs.Image,
          rs.Type
        );        
        this.imagefilename = rs.Image;
        this.filename = rs.Image.split('/').reverse()[0];
        this.appSliderEditForm = this.formBuilder.group({
          'Title': [this.editappslider.Title, [Validators.required, Validators.minLength(1)]],
          'Description': [this.editappslider.Description, [Validators.required, Validators.minLength(1)]],
          'file': [''],
          'Type': [this.editappslider.Type, [Validators.required, Validators.minLength(1)]]          
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
    if (this.appSliderEditForm.valid) {

      if (this.imagefile.length > 0) {
        this.service.fileupload(this.imagefile, this.appSliderEditForm.value.Type, this.filename).subscribe((res) => {
          if (res.body['error'] === false) {
            this.editappslider = new AppSliderEditModel(
              Id,
              this.appSliderEditForm.value.Title,
              this.appSliderEditForm.value.Description,
              res.body['data'],
              this.appSliderEditForm.value.Type
            );
            this.service.appSliderEdit(this.editappslider).subscribe(res => {
              if (res.body['error'] === false) {
                environment.swalalert('success', res.body['msg']).then(value => {
                  if (value) {
                    this.appSliderEditForm.reset();
                    this.router.navigate(['appSliderView']);
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
        this.editappslider = new AppSliderEditModel(
          Id,
          this.appSliderEditForm.value.Title,
          this.appSliderEditForm.value.Description,
          this.imagefilename,
          this.appSliderEditForm.value.Type
        );
        this.service.appSliderEdit(this.editappslider).subscribe(res => {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.appSliderEditForm.reset();
                this.router.navigate(['appSliderView']);
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


