import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-billingpanel',
  templateUrl: './billingpanel.component.html',
  styleUrls: ['./billingpanel.component.css']
})
export class BillingpanelComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  page: Number = 1;
  result: any;
  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      {name: 'John', status: true},
      { name: 'Mike', status: false },
      {name: 'Kail', status: true},
      {name: 'Radie', status: true},
      {name: 'Chris', status: false},
      {name: 'Cypher', status: false},
      { name: 'Kilin', status: false },
      { name: 'Johnson', status: false },
      { name: 'Carter', status: true },
      { name: 'Pike', status: true }
    ];
  }

}
