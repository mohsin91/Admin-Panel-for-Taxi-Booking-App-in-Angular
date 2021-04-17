import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ridelaterbooking',
  templateUrl: './ridelaterbooking.component.html',
  styleUrls: ['./ridelaterbooking.component.css']
})
export class RidelaterbookingComponent implements OnInit {

  result: any;
  // tslint:disable-next-line:ban-types
  page: Number = 1;
  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      { bookingid: 2996, from: '40/156, Tirumurthy Nagar, Nungambakkam, Chennai, Tamil Nadu 600034, India', fare: 52.41, estimation: '$52.41	', to: 'Sembakkam, Chennai, Tamil Nadu, India	', status: 'completed' },
      { bookingid: 2995, from: 'Hadar Street, 2, Herzliyya - 4629025, Israel', fare: 125.79, estimation: '$125.79	', to: 'Sembakkam, Chennai, Tamil Nadu, India	', status: 'cancelled' },
      { bookingid: 2994, from: '1, Domodedovo, Moskovskaya oblast, Russia, 142015', fare: 4.45, estimation: '$4.45	', to: 'улица Текстильщиков, дом 7, поселок городского типа Октябрьский, Moscow Oblast, Russia	', status: 'cancelled' },
      { bookingid: 2993, from: 'Volans St, Windhoek - Windhoek - Namibia', fare: 131.81, estimation: '$131.81', to: 'Klein Windhoek, Windhoek, Namibia	', status: 'cancelled' },
      { bookingid: 2992, from: 'Grand Court Hotel, Saint George Street, Jerusalem', fare: 279.65, estimation: '$279.65', to: 'Ben Gurion Airport, Israel	', status: 'cancelled' },
      { bookingid: 2991, from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 133.27, estimation: '$133.27', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', status: 'cancelled' },
      { bookingid: 2990, from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 133.26, estimation: '$133.26', to: 'Ben Gurion Airport, Israel	', status: 'cancelled' },
      { bookingid: 2989, from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 4.03, estimation: '$4.03', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', status: 'cancelled' },
      { bookingid: 2988, from: 'Unnamed Road, Jerusalem, Israel	', fare: 10.95, estimation: '$10.95', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', status: 'cancelled' },
      { bookingid: 2987, from: 'Unnamed Road, Jerusalem, Israel	', fare: 133.23, estimation: '$133.23', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', status: 'cancelled' }
    ];
  }
}
