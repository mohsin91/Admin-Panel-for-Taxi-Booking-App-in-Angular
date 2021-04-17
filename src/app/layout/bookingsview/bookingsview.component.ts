import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { BookingsViewModel } from './bookingsview.model';
import { BookingsviewService } from './bookingsview.service';
import { BookingsViewListModel } from './bookingsviewlist.model';

@Component({
  selector: 'app-bookingsview',
  templateUrl: './bookingsview.component.html',
  styleUrls: ['./bookingsview.component.css']
})
export class BookingsviewComponent implements OnInit {
  paramsid: any;
  bookingsview: BookingsViewModel;
  bookingslist: BookingsViewListModel;
  Id: Number;
  ProviderId: Number;
  uImage: String;
  pImage: String;
  uFirstName: String;
  pFirstName: String;
  uLastName: String;
  pLastName: String;
  uEmail: String;
  pEmail: String;
  uMobile: String;
  pMobile: String; 
  FromLocation: String;
  ToLocation: String;
  CancelledFor: String;
  SourceLat: any;
  SourceLong: any;
  DestinyLat: any;
  DestinyLong: any;
  S2CellId: String;
  Status: String;
  Distance: Number;
  Estimation: Number;
  CurrencyType: String;
  Tax: Number;
  WaitingCharges: Number;
  TotalAmount: Number;
  Description: String;
  ContactNo: String;
  CountryName: String;
  CancelledBy: String;   
  Name: String;
  latitude: any;
  longitude: any;
  mapType: String = 'roadmap';
  travelMode: String = 'DRIVING';
  origin: any;
  destination: any;
  PaymentMode: any;
  icon = {
    url: 'assets/img/caricon.png',
    scaledSize: {
      width: 60,
      height: 50
    }
  };


  // icon: String = 'assets/img/caricon.png';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: BookingsviewService,
    private appspinner: AppComponent) {
  }

  ngOnInit() {
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.service.getbookingsdataview(this.paramsid).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['body']['data']);
          if (Object.keys(this.bookingsview.data).length > 0) {
            this.bookingslist = this.bookingsview['data'];
            this.uImage = this.bookingslist.uImage;
            this.pImage = this.bookingslist.pImage;
            this.uFirstName = this.bookingslist.uFirstName;
            this.uLastName = this.bookingslist.uLastName;
            this.uEmail = this.bookingslist.uEmail;
            this.uMobile = this.bookingslist.uMobile;
            this.ProviderId = this.bookingslist.ProviderId;
            this.pFirstName = this.bookingslist.pFirstName;
            this.pLastName = this.bookingslist.pLastName;
            this.pEmail = this.bookingslist.pEmail;
            this.pMobile = this.bookingslist.pMobile;
            this.FromLocation = this.bookingslist.FromLocation;
            this.ToLocation = this.bookingslist.ToLocation ;
            this.CancelledFor = this.bookingslist.CancelledFor ;
            this.SourceLat = parseFloat(this.bookingslist.SourceLat);
            this.SourceLong = parseFloat(this.bookingslist.SourceLong);
            this.DestinyLat = parseFloat(this.bookingslist.DestinyLat);
            this.DestinyLong = parseFloat(this.bookingslist.DestinyLong);
            this.S2CellId = this.bookingslist.S2CellId ;
            this.Status = this.bookingslist.Status ;
            this.Distance = this.bookingslist.Distance ;
            this.Estimation = this.bookingslist.Estimation ;
            this.CurrencyType = this.bookingslist.CurrencyType ;
            this.Tax = this.bookingslist.Tax ;
            this.WaitingCharges = this.bookingslist.WaitingCharges ;
            this.TotalAmount = this.bookingslist.TotalAmount ;
            this.Description = this.bookingslist.Description ;
            this.ContactNo = this.bookingslist.ContactNo ;
            this.CountryName = this.bookingslist.CountryName ;
            this.CancelledBy = this.bookingslist.CancelledBy ;
            this.Name = this.bookingslist.Name ;
            this.Id = this.bookingslist.Id;
            this.origin = { lat: this.SourceLat, lng: this.SourceLong };
            this.destination = { lat: this.DestinyLat, lng: this.DestinyLong };
            this.latitude = this.SourceLat;
            this.longitude = this.SourceLong;
            this.PaymentMode = this.bookingslist.PaymentMode;
          } else {
            environment.swalalert('nodata', 'No Data Available ');
          }
          this.appspinner.spinnerAlert('hide');
        }
      })
    });
  }


 autoloadproviderloc() {
   this.service.getproviderbookingsdataview(this.ProviderId).subscribe((res) => {
     if (res['error']) {
      //  environment.swalalert('nodata', res['msg']);
      //  this.appspinner.spinnerAlert('hide');
     } else {
       this.bookingsview = new BookingsViewModel(res['error'], res['msg'], res['body']['data']);
       this.bookingslist = this.bookingsview['data'];
       if (Object.keys(this.bookingsview.data).length > 0) {
         this.latitude = parseFloat(this.bookingslist.Latitude);
         this.longitude = parseFloat(this.bookingslist.Longitude);
        //  this.DestinyLat = parseFloat(this.bookingslist.DestinyLat);
        //  this.DestinyLong = parseFloat(this.bookingslist.DestinyLong);       
         console.log(this.latitude,this.longitude);
        //  this.destination = { lat: this.DestinyLat, lng: this.DestinyLong };         
        //  this.appspinner.spinnerAlert('hide');
       } else {
        //  environment.swalalert('nodata', 'No Data Available ');
        //  this.appspinner.spinnerAlert('hide');
       }
     }
   },
     (err) => {
       console.log(err);
     })
 }
  public setintervalid = setInterval(() => {
    this.autoloadproviderloc();
  }, 5000); 
  



}

