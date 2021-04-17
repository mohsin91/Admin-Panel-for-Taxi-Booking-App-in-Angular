import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  page: Number = 1;
  result: any;

  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      {driver: 0, email: 'John***.com', mobile: '(+42)565***90', name: 'John', status: true },
      { driver: 0, email: 'Mike***.com', mobile: '(+423)365***80', name: 'Mike',status: false },
      { driver: 0, email: 'Kail***.com', mobile: '(+32)565***10', name: 'Kail',status: true },
      { driver: 0, email: 'Radie***.com', mobile: '(+942)565***90', name: 'Radie',status: true },
      { driver: 0, email: 'Chris***.com', mobile: '(+22)565***00', name: 'Chris',status: false },
      { driver: 0, email: 'Cypher***.com', mobile: '(+542)565***60', name: 'Cypher',status: false },
      { driver: 0, email: 'Kilin***.com', mobile: '(+42)465***20', name: 'Kilin',status: false },
      { driver: 0, email: 'Johnson***.com', mobile: '(+42)765***50', name: 'Johnson',status: false },
      { driver: 0, email: 'Carter***.com', mobile: '(+42)865***90', name: 'Carter', status: true },
      { driver: 0, email: 'Pike***.com', mobile: '(+42)965***30', name: 'Pike', status: true }
    ]
  }

}
