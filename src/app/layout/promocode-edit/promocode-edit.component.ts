import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { PromoCodeEditModel } from './promocodeedit.model';
import { PromocodeeditService } from './promocodeedit.service';


@Component({
  selector: 'app-promocode-edit',
  templateUrl: './promocode-edit.component.html',
  styleUrls: ['./promocode-edit.component.css']
})
export class PromocodeEditComponent implements OnInit {


  typeid: any;
  returnUrl: any;
  promocodesEditForm: any;
  promocodetype: PromoCodeEditModel;
  IsActive: any;
  paramsid: any;
  validfrom: any;
  validto: any;
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
    private service: PromocodeeditService,
    private appspinner: AppComponent) {

    this.promocodesEditForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(1)]],
      'coupon': ['', [Validators.required, Validators.minLength(1)]],
      'discount': ['', [Validators.required, Validators.minLength(1)]],
      'discounttype': ['', [Validators.required, Validators.minLength(1)]],
      'threshold': ['', [Validators.required, Validators.minLength(1)]],
      'minvalue': ['', [Validators.required, Validators.minLength(1)]],
      'maxvalue': ['', [Validators.required, Validators.minLength(1)]],
      'validfrom': ['', [Validators.required, Validators.minLength(1)]],
      'validto': ['', [Validators.required, Validators.minLength(1)]],
      'redeemableperuser': ['', [Validators.required, Validators.minLength(1)]],
      'description': ['', [Validators.required, Validators.minLength(1)]],
      'IsActive': ['']
    });
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');

    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getpromocodeslist(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          var rs = res.body['data'];
          // console.log(rs);
          var status;
          if (rs.Status === 'Active') {
            status = true;
          } else {
            status = false;
          }
          this.promocodetype = new PromoCodeEditModel(
            rs.Id,
            rs.Name,
            rs.Coupon,
            rs.Discount,
            rs.Type,
            rs.Threshold,
            rs.MinValueToRedeem,
            rs.MaxValueToRedeem,
            rs.ValidFrom,
            rs.ValidTo,
            rs.RedeemableType,
            status,
            rs.Description
          );
          this.promocodesEditForm = this.formBuilder.group({
            'name': [this.promocodetype.Name, [Validators.required, Validators.minLength(1)]],
            'coupon': [this.promocodetype.Coupon, [Validators.required, Validators.minLength(1)]],
            'discount': [this.promocodetype.Discount, [Validators.required, Validators.minLength(1)]],
            'discounttype': [this.promocodetype.Type, [Validators.required, Validators.minLength(1)]],
            'threshold': [this.promocodetype.Threshold, [Validators.required, Validators.minLength(1)]],
            'minvalue': [this.promocodetype.MinValueToRedeem, [Validators.required, Validators.minLength(1)]],
            'maxvalue': [this.promocodetype.MaxValueToRedeem, [Validators.required, Validators.minLength(1)]],
            'validfrom': [this.promocodetype.ValidFrom, [Validators.required, Validators.minLength(1)]],
            'validto': [this.promocodetype.ValidTo, [Validators.required, Validators.minLength(1)]],
            'redeemableperuser': [this.promocodetype.RedeemableType, [Validators.required, Validators.minLength(1)]],
            'description': [this.promocodetype.Description, [Validators.required, Validators.minLength(1)]],
            'IsActive': [this.promocodetype.Status]
          });

          this.IsActive = status;
        }
      })
    });
    this.appspinner.spinnerAlert('hide');
  }

  promocodesEdit() {
    var Id = this.route.snapshot.params.id;
    if (this.promocodesEditForm.valid) {
      var rs = this.promocodesEditForm.value;
      if (Date.parse(rs.validfrom) > Date.parse(rs.validto)) {
        environment.swalalert('error', 'Please enter a valid expiry date')
      } else {
      var status = '';
      if (this.IsActive === true) {
        status += 'Active';
      } else {
        status += 'InActive';
      }
      this.promocodetype = new PromoCodeEditModel(
        Id,
        rs.name,
        rs.coupon,
        rs.discount,
        rs.discounttype,
        rs.threshold,
        rs.minvalue,
        rs.maxvalue,
        this.formatDate(rs.validfrom),
        this.formatDate(rs.validto),
        rs.redeemableperuser,
        status,
        rs.description
      );
      // console.log(this.promocodetype);
      this.service.promocodesEdit(this.promocodetype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
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
