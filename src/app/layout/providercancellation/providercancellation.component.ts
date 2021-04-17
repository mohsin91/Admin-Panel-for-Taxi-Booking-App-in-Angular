import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-providercancellation',
  templateUrl: './providercancellation.component.html',
  styleUrls: ['./providercancellation.component.css']
})
export class ProvidercancellationComponent implements OnInit {

    page: Number = 1;
    result: any;
  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      { name: 'mike', from: '40/156, Tirumurthy Nagar, Nungambakkam, Chennai, Tamil Nadu 600034, India', fare: 52.41, estimation: '$52.41	', to: 'Sembakkam, Chennai, Tamil Nadu, India	', des: 'personal' },
      { name: 'john', from: 'Hadar Street, 2, Herzliyya - 4629025, Israel', fare: 125.79, estimation: '$125.79	', to: 'Sembakkam, Chennai, Tamil Nadu, India	', des: 'Changed my mind' },
      { name: 'kile', from: '1, Domodedovo, Moskovskaya oblast, Russia, 142015', fare: 4.45, estimation: '$4.45	', to: 'улица Текстильщиков, дом 7, поселок городского типа Октябрьский, Moscow Oblast, Russia	', des: 'My plan has changed' },
      { name: 'pike', from: 'Volans St, Windhoek - Windhoek - Namibia', fare: 131.81, estimation: '$131.81', to: 'Klein Windhoek, Windhoek, Namibia	', des: 'Wrong destination' },
      { name: 'wilson', from: 'Grand Court Hotel, Saint George Street, Jerusalem', fare: 279.65, estimation: '$279.65', to: 'Ben Gurion Airport, Israel	', des: 'Customer not picking calls' },
      { name: 'tyson', from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 133.27, estimation: '$133.27', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', des: 'Waiting for long time' },
      { name: 'lilin', from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 133.26, estimation: '$133.26', to: 'Ben Gurion Airport, Israel	', des: 'No response' },
      { name: 'park', from: 'Har Nevo Street, 11, Tel Aviv-Yafo - 6274713, Israel', fare: 4.03, estimation: '$4.03', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', des: 'Waiting for long time' },
      { name: 'stonis', from: 'Unnamed Road, Jerusalem, Israel	', fare: 10.95, estimation: '$10.95', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', des: 'Customer not picking calls' },
      { name: 'max', from: 'Unnamed Road, Jerusalem, Israel	', fare: 133.23, estimation: '$133.23', to: 'HaShomer Street 4, Tel Aviv-Yafo, Israel	', des: 'No response' }
    ];
  }

}
