import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { RidetypeVehicleAddModel } from './ridetypevehicleadd.model';
import { RidetypeVehicleaddService } from './ridetypevehicleadd.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ridetypevehicleadd',
  templateUrl: './ridetypevehicleadd.component.html',
  styleUrls: ['./ridetypevehicleadd.component.css']
})
export class RidetypevehicleaddComponent implements OnInit {
  @ViewChild('passiveimg') passiveimg: ElementRef;
  @ViewChild('activeimg') activeimg: ElementRef;

    typeid: any;
    returnUrl: any;
    ridevtypeAddForm: any;
    ridevtype: RidetypeVehicleAddModel;
    countrylist: any;
    CurrencyTypeValue: any;
    statelist: any;
    citylist: any;
    ret: String;
    fileToUpload: File = null;
    base64textString: string;
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

    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:RidetypeVehicleaddService,
      private appspinner: AppComponent) {       
        this.ridevtypeAddForm = this.formBuilder.group({
          'Name' : ['',[Validators.required,Validators.minLength(1)]],
          'IconPassive' : [''],
          'IconActive' : [''],
          'CountryId' : ['',[Validators.required,Validators.minLength(1)]],
          'StateIds' : ['',[Validators.required,Validators.minLength(1)]],
          'CityIds' : ['',[Validators.required,Validators.minLength(1)]],
          'BaseCharge' : ['',[Validators.required,Validators.minLength(1)]],
          'MinCharge' : ['',[Validators.required,Validators.minLength(1)]],
          'CurrencyType' : [''],
          'CommissionPercentage' : ['',[Validators.required,Validators.minLength(1)]],
          'WaitingCharge' : ['',[Validators.required,Validators.minLength(1)]],
          'Capacity' : ['',[Validators.required,Validators.minLength(1)]],
          'ShortDesc' : ['',[Validators.required,Validators.minLength(1)]],
          'LongDesc' : ['',[Validators.required,Validators.minLength(1)]],          
          'IsActive' : ['', [Validators.required, Validators.minLength(1)]]
        });         
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
        this.countrylist=res['body']['data'];
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
        statelist.push({Id:x['Id'], StateName: x['StateName']});
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
      citylist.push({Id:x['Id'], CityName: x['CityName']});
    });
    this.cdropdownList = citylist;
  }
},
(err) => {
  console.log(err);
})  
this.appspinner.spinnerAlert('hide');
    }
    changecountryid(id) {
      this.CurrencyTypeValue = this.countrylist.filter( x => x.Id == id )[0].CurrencySymbol;
    }

  imagefileupload(data : any) {
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
    async ridevehicletypeAdd() {
      this.passiveimagefile = this.passiveimg.nativeElement.files;
      this.activeimagefile = this.activeimg.nativeElement.files;
      if(this.ridevtypeAddForm.valid) {
        var sF = this.ridevtypeAddForm.value;
        var stateid = [];
        var cityid = [];
        sF.StateIds.filter((x) => {
          stateid.push(x['Id']);
        });
        sF.CityIds.filter((x) => {
          cityid.push(x['Id']);
        });      
        this.IconPassive = await this.imagefileupload({file: this.passiveimagefile,type: 'ride'});
        this.IconActive = await this.imagefileupload({file: this.activeimagefile, type: 'ride' });
        var status = '';
        if (sF.IsActive === true) {
          status += 'Yes';
        } else {
          status += 'No';
        }
        this.ridevtype = new RidetypeVehicleAddModel(
          sF.RideTypeId,
          sF.Name,
          this.IconPassive,
          this.IconActive,            
          sF.CountryId,           
          '[' + stateid + ']',
          '[' + cityid + ']',
          sF.BaseCharge,            
          sF.MinCharge,             
          this.CurrencyTypeValue,          
          sF.CommissionPercentage,
          sF.WaitingCharge,         
          sF.Capacity,                          
          sF.ShortDesc,           
          sF.LongDesc,
          status          
          );
        this.service.ridevehicletypeAdd(this.ridevtype).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {         
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.ridevtypeAddForm.reset();
                this.router.navigate(['rideVehicletypeView']);
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
  }
  