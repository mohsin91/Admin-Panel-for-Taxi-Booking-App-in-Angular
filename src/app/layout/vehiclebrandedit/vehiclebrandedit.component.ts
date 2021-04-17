import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehicleBrandEditModel } from './vehiclebrandedit.model';
import { VehiclebrandeditService } from './vehiclebrandedit.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-vehiclebrandedit',
  templateUrl: './vehiclebrandedit.component.html',
  styleUrls: ['./vehiclebrandedit.component.css']
})
export class VehiclebrandeditComponent implements OnInit {
 
    vehiclebrandEditForm: any;
    vehiclebrandtype: VehicleBrandEditModel;
    countrylist : [];
    paramsid: any;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    brandname: any;

    constructor(
      private formBuilder:FormBuilder,
      private router:Router,
      private route:ActivatedRoute,
      private guard:GuardGuard,
      private encry:EncryService,
      private service:VehiclebrandeditService,
      private appspinner: AppComponent) {     
       }
  
  
    ngOnInit() {    
    this.appspinner.spinnerAlert('show');
      this.route.params.subscribe(params => {         
        this.paramsid = params.id;
        this.service.getcountry().subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
            this.countrylist=res['body']['data']; 
            this.dropdownList = [];
            this.countrylist.filter((x) => {
              this.dropdownList.push({Id: x['Id'], CountryName: x['CountryName']});
            });
          }
        },
        (err) => {
          console.log(err);
        });

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'Id',
          textField: 'CountryName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 'All',
          allowSearchFilter: true
        };
        this.service.getvehiclebrand(this.paramsid).subscribe((res) => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          var rs = res.body['data']; 
        this.vehiclebrandtype = new VehicleBrandEditModel(
            rs.Id,
            rs.BrandName,
            rs.CountryId
          );   
          this.selectedItems = [];
          rs.CountryId.map((c) => {
            this.dropdownList.filter((d) => {
                if(d['Id']===c){
                  this.selectedItems.push(d);
                }
            });
          });
          this.brandname = this.vehiclebrandtype.BrandName
        }
      });      
    });
    this.appspinner.spinnerAlert('hide');
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }                  
    vehiclebrandedit() {
      var Id = this.route.snapshot.params.id;
      if ((this.brandname !== '') && (this.selectedItems.length > 0)) {
        var CountryId = [];
        this.selectedItems.filter((x) => {
          CountryId.push(x['Id']);
        });
        this.vehiclebrandtype = new VehicleBrandEditModel(
          Id,
          this.brandname,
          '[' + CountryId + ']'
        )
        this.service.vehiclebrandEdit(this.vehiclebrandtype).subscribe(res => {
          if (res['error']) {
            environment.swalalert('nodata', res['msg']);
            this.appspinner.spinnerAlert('hide');
          } else {          
          if(res.body['error'] === false ) {
            environment.swalalert('success',res.body['msg']).then(value => {
              if(value) {
                this.router.navigate(['vehicleBrandView']);
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
