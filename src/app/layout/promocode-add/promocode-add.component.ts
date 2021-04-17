import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { PromoCodeAddModel } from './promocodeadd.model';
import { PromocodeaddService } from './promocodeadd.service';


@Component({
  selector: 'app-promocode-add',
  templateUrl: './promocode-add.component.html',
  styleUrls: ['./promocode-add.component.css']
})
export class PromocodeAddComponent implements OnInit {

  typeid: any;
  returnUrl: any;
  promocodesAddForm: any;
  promovtype: PromoCodeAddModel;


  validfrom: any = new Date();
  validto: any = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  // public dateValue: Object = new Date(new Date().setDate(14));
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  public maxDate: Object = new Date(this.currentYear, 12, 31);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: PromocodeaddService,
    private appspinner: AppComponent) {
    this.promocodesAddForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(1)]],
      'coupon': ['', [Validators.required, Validators.minLength(1)]],
      'discount': ['', [Validators.required, Validators.minLength(1)]],
      'discounttype': ['', [Validators.required, Validators.minLength(1)]],
      'threshold': ['', [Validators.required, Validators.minLength(1)]],
      'minvalue': ['', [Validators.required, Validators.minLength(1)]],
      'maxvalue': ['', [Validators.required, Validators.minLength(1)]],
      'validfrom': [this.validfrom, [Validators.required, Validators.minLength(1)]],
      'validto': [this.validto, [Validators.required, Validators.minLength(1)]],      
      'redeemableperuser': ['', [Validators.required, Validators.minLength(1)]],
      'description': ['', [Validators.required, Validators.minLength(1)]],
      'IsActive': ['']
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');

    this.appspinner.spinnerAlert('hide');
  }


  promocodesAdd() {

    if (this.promocodesAddForm.valid) {



      var sF = this.promocodesAddForm.value;

      console.log(Date.parse(sF.validfrom));
      console.log(Date.parse(sF.validto));
      if (Date.parse(sF.validfrom) > Date.parse(sF.validto)) {
        environment.swalalert('error', 'Please enter a valid expiry date')
      } else {

      var status = '';
      if (sF.IsActive === true) {
        status += 'Active';
      } else {
        status += 'InActive';
      }
      // console.log(sF.validfrom.getFullYear() + "-" + sF.validfrom.getMonth() + 1 + "-" +sF.validfrom.getDate());
      this.promovtype = new PromoCodeAddModel(
        sF.name,
        sF.coupon,
        sF.discount,
        sF.discounttype,        
        sF.threshold,
        sF.minvalue,
        sF.maxvalue,
        this.formatDate(sF.validfrom),
        this.formatDate(sF.validto),     
        sF.redeemableperuser,
        status,
        sF.description
      );
      this.service.promocodesAdd(this.promovtype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.promocodesAddForm.reset();
                this.router.navigate(['promoCodes']);
              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      });
    }
    }
    else {
      environment.swalalert('warning', 'Validation Required');
    }
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
