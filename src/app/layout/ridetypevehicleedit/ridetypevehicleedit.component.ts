import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { RidetypeVehicleEditModel } from './ridetypevehicleedit.model';
import { RidetypevehicleeditService } from './ridetypevehicleedit.service';

@Component({
  selector: 'app-ridetypevehicleedit',
  templateUrl: './ridetypevehicleedit.component.html',
  styleUrls: ['./ridetypevehicleedit.component.css']
})
export class RidetypevehicleeditComponent implements OnInit {

  @ViewChild('passiveimg') passiveimg: ElementRef;
  @ViewChild('activeimg') activeimg: ElementRef;

  typeid: any;
  returnUrl: any;
  ridevtypeEditForm: any;
  ridevtype: RidetypeVehicleEditModel;
  countrylist: any;
  CurrencyTypeValue: any;
  statelist: any;
  citylist: any;
  ret: String;
  fileToUpload: File = null;
  RideTypeId: Number;
  IconPassive: String;
  IconActive: String;
  passiveimagefile: File[];
  activeimagefile: File[];
  sdropdownList = [];
  sselectedItems = [];
  sdropdownSettings = {};
  cdropdownList = [];
  cselectedItems = [];
  cdropdownSettings = {};
  paramsid: any;
  Passiveimagefilename: any;
  Activeimagefilename: any;
  imgfilename: any;
  Name: any;
  CountryId: any;
  StateIds: any;
  CityIds: any;
  BaseCharge: any;
  MinCharge: any;
  CurrencyType: any;
  CommissionPercentage: any;
  WaitingCharge: any;
  Capacity: any;
  ShortDesc: any;
  LongDesc: any;
  IsActive: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: RidetypevehicleeditService,
    private appspinner: AppComponent) {
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.sdropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'StateName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 'All',
      allowSearchFilter: true
    };
    this.cdropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'CityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 'All',
      allowSearchFilter: true
    };
    this.service.getcountry().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.countrylist = res['body']['data'];
      }
    },
      (err) => {
        console.log(err);
      })
    this.service.getstate().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        var statelist = [];
        res['body']['data'].filter((x) => {
          statelist.push({ Id: x['Id'], StateName: x['StateName'] });
        });
        this.sdropdownList = statelist;
      }
    },
      (err) => {
        console.log(err);
      })
    this.service.getcity().subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        var citylist = [];
        res['body']['data'].filter((x) => {
          citylist.push({ Id: x['Id'], CityName: x['CityName'] });
        });
        this.cdropdownList = citylist;
      }
    },
      (err) => {
        console.log(err);
      })
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getridevehicletypepages(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          var rs = res.body['data'];
          var status;
          if (rs.IsActive === 'Yes') {
            status = true;
          } else {
            status = false;
          }          
          this.ridevtype = new RidetypeVehicleEditModel(
            rs.Id,
            rs.RideTypeId,
            rs.Name,
            rs.IconPassive,
            rs.IconActive,
            rs.CountryId,
            rs.StateIds,
            rs.CityIds,
            rs.BaseCharge,
            rs.MinCharge,
            rs.CurrencyType,
            rs.CommissionPercentage,
            rs.WaitingCharge,
            rs.Capacity,
            rs.ShortDesc,
            rs.LongDesc,
            status
          );
          this.RideTypeId = this.ridevtype.RideTypeId;
          this.Passiveimagefilename = this.ridevtype.IconPassive;
          this.Activeimagefilename = this.ridevtype.IconActive;
          this.sselectedItems = [];
          this.ridevtype.StateIds.map((c) => {
            this.sdropdownList.filter((d) => {
              if (d['Id'] === c) {
                this.sselectedItems.push(d);
              }
            });
          });
          this.cselectedItems = [];
          this.ridevtype.CityIds.map((c) => {
            this.cdropdownList.filter((d) => {
              if (d['Id'] === c) {
                this.cselectedItems.push(d);
              }
            });
          });                    
            this.Name = this.ridevtype.Name;
            this.IconPassive = this.ridevtype.IconPassive;
            this.IconActive = this.ridevtype.IconActive;
            this.CountryId  = this.ridevtype.CountryId;
            this.BaseCharge = this.ridevtype.BaseCharge;
            this.MinCharge = this.ridevtype.MinCharge;
            this.CurrencyType = this.ridevtype.CurrencyType;
            this.CommissionPercentage = this.ridevtype.CommissionPercentage;
            this.WaitingCharge = this.ridevtype.WaitingCharge;
            this.Capacity = this.ridevtype.Capacity;
            this.ShortDesc = this.ridevtype.ShortDesc;
            this.LongDesc = this.ridevtype.LongDesc;
            this.IsActive =  status;
        }
      })
    });      
    this.appspinner.spinnerAlert('hide');
  }
  changecountryid(id) {
    this.CurrencyTypeValue = this.countrylist.filter(x => x.Id == id)[0].CurrencySymbol;
  }
  readURL(event , name) {
    if (name === 'active') {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.Activeimagefilename = reader.result;
        reader.readAsDataURL(file);
      }      
    }
    else {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.Passiveimagefilename = reader.result;
      reader.readAsDataURL(file);
    }  
  }
 }

  imagefileupload(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.service.fileupload(data.file, data.type).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          this.ret = res.body['data'];
          resolve(res.body['data']);
        }
      },
        (err) => {
          console.log(err);
          reject(err);
        })
    })
  }
  async ridevehicletypeEdit() {
    var Id = this.route.snapshot.params.id;    
    this.passiveimagefile = this.passiveimg.nativeElement.files;
    this.activeimagefile = this.activeimg.nativeElement.files;
    if (this.sselectedItems.length > 0 && this.cselectedItems.length > 0) {
      var stateid = [];
      var cityid = [];
      this.sselectedItems.filter((x) => {
        stateid.push(x['Id']);
      });
      this.cselectedItems.filter((x) => {
        cityid.push(x['Id']);
      });
      if (this.activeimagefile.length > 0) {
        this.IconActive = await this.imagefileupload({ file: this.activeimagefile, type: 'ride' });        
      }
      if (this.passiveimagefile.length > 0) {
        this.IconPassive = await this.imagefileupload({ file: this.passiveimagefile, type: 'ride' });
      }      
      var status = '';
      if (this.IsActive === true) {
        status += 'Yes';
      } else {
        status += 'No';
      }
      this.ridevtype = new RidetypeVehicleEditModel(
        Id,
        this.RideTypeId,
        this.Name,
        this.IconPassive,
        this.IconActive,
        this.CountryId,
        '[' + stateid + ']',
        '[' + cityid + ']',
        this.BaseCharge,
        this.MinCharge,
        this.CurrencyTypeValue,
        this.CommissionPercentage,
        this.WaitingCharge,
        this.Capacity,
        this.ShortDesc,
        this.LongDesc,
        status
      );
      this.service.ridevehicletypeEdit(this.ridevtype).subscribe(res => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', res.body['msg']).then(value => {
              if (value) {
                this.router.navigate(['rideVehicletypeView']);
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
