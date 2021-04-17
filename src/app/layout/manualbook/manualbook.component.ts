import { Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MapsAPILoader } from '@agm/core';
import { } from '@agm/core/services/google-maps-types';
import { AppComponent } from 'src/app/app.component';
import { ManualbookService } from './manualbook.service';
import { ManualBookingViewModel } from './manualbookview.model';
declare const google: any;


@Component({
  selector: 'app-manualbook',
  templateUrl: './manualbook.component.html',
  styleUrls: ['./manualbook.component.css']
})


export class ManualbookComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public tolatitude: number;
  public tolongitude: number;  
  public fromsearchControl: FormControl;
  public tosearchControl: FormControl;  
  public zoom: number;
  private geoCoder;
  manualBooking: ManualBookingViewModel;
  result: any;
  rideVehicleData: any;
  address: string;
  latt: any;
  long: any;
  origin: any;
  destination: any;
  mobile: String;
  firstName: String;
  lastName: String;
  email: String;



  @ViewChild("fromsearch")
  public fromsearchElementRef: ElementRef;

  @ViewChild("tofromsearch")
  public tosearchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private appspinner: AppComponent,
    private service: ManualbookService,
  ) { 

  }

  ngOnInit() {
    // environment.swalalert('underconst', 'This Page has Under Contruction Work ');
    //set google maps defaults
    this.zoom = 7;
    this.latitude = 13.0570373;
    this.longitude = 80.2485868;
    this.tolatitude = 13.053398491336493;
    this.tolongitude = 79.82030310859375;    
    //create search FormControl
    this.origin = {lat: this.latitude, lng: this.longitude};
    this.destination = {lat: this.tolatitude, lng: this.tolongitude};
    this.fromsearchControl = new FormControl();
    this.tosearchControl = new FormControl();
    // set current position
    // this.setCurrentPosition();

    //load Places Autocomplete

    // this.googleLocationFinder('type', this.fromsearchElementRef.nativeElement);
    this.getRideVehicleInfo();
  }

  getUsersInfo(data) {
  this.service.getBookingUsersListView(data).subscribe((res) => {
    if (res['error']) {
      environment.swalalert('nodata', res['msg']);
    } else {      
    this.manualBooking = new ManualBookingViewModel(res['error'], res['msg'], res['data']);
    if (res['data'].length > 0 && this.manualBooking['data'].length > 0) {
      this.result = this.manualBooking.data[0];
      this.firstName = this.result.FirstName;
     this.lastName = this.result.LastName;
      this.email = this.result.Email;
    } else {
      environment.swalalert('nodata', 'No Data Available ');
    }
  }
  },
    (err) => {
      console.log(err);
    });
}

getRideVehicleInfo() {
  this.service.rideVehicleData().subscribe((res) => {

    if (res.body['error']) {
      environment.swalalert('nodata', res['msg']);
    } else {      
    this.manualBooking = new ManualBookingViewModel(res.body['error'], res.body['msg'], res.body['data']);
    if (this.manualBooking['data'].length > 0) {
      
      this.rideVehicleData = this.manualBooking.data;
    } else {
      environment.swalalert('nodata', 'No Data Available ');
    }
  }
  },
    (err) => {
      console.log(err);
    });
}






  googleLocationFinder(type) {
    var to = document.getElementById('toLocation');
    if (type === 'from') {
        
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.fromsearchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 8;
          this.origin = {lat: this.latitude, lng: this.longitude};

        });
      });
    });
  }
    else {
      this.mapsAPILoader.load().then(() => {
        let autocompleteto = new google.maps.places.Autocomplete(to, {
          types: ["address"]
        });
        autocompleteto.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let placeto: google.maps.places.PlaceResult = autocompleteto.getPlace();
            //verify result
            if (placeto.geometry === undefined || placeto.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.tolatitude = placeto.geometry.location.lat();
            this.tolongitude = placeto.geometry.location.lng();
            this.zoom = 10;
            this.destination = {lat: this.tolatitude, lng: this.tolongitude};
          });
        });
      });      
    }
  }

  markerDragEnd($event: MouseEvent, type) {
    this.geoCoder = new google.maps.Geocoder;
    if (type === 'from') {
      this.latitude = $event['coords'].lat;
      this.longitude = $event['coords'].lng;  
      this.latt = this.latitude;
      this.long = this.longitude;
      this.origin = {lat: this.latt, lng: this.long};
    } else {
      this.tolatitude = $event['coords'].lat;
      this.tolongitude = $event['coords'].lng;
      this.latt = this.tolatitude;
      this.long = this.tolongitude;
      this.destination = {lat: this.latt, lng: this.long};
    }
    this.geoCoder.geocode({ 'location': { lat: this.latt, lng: this.long } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          if (type === 'from') {
            this.zoom = 8;
            this.fromsearchElementRef.nativeElement.value = this.address;    
          } else {            
            this.zoom = 8;
            document.getElementById('toLocation')['value'] = this.address;   
          }
        } else {
          console.log('results error');
        }
      } else {
        console.log('response error');
      }

    });
  }

}