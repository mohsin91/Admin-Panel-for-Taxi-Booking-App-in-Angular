import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rentaloutsation',
  templateUrl: './rentaloutsation.component.html',
  styleUrls: ['./rentaloutsation.component.css']
})
export class RentaloutsationComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  page: Number = 1;
  result: any;
  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      { packages: 0, type: 'normal', fare: 50, estimation: 5, vname: 'max', status: true },
      { packages: 0, type: 'Basic', fare: 44, estimation: 5, vname: 'car', status: false },
      { packages: 0, type: 'Basic', fare: 22, estimation: 5, vname: 'micro', status: true },
      { packages: 0, type: 'Moto', fare: 44, estimation: 5, vname: 'mini', status: true },
      { packages: 0, type: 'Basic', fare: 77, estimation: 5, vname: 'cabsiko', status: false },
      { packages: 0, type: 'Mini', fare: 88, estimation: 5, vname: 'Cypher', status: false },
      { packages: 0, type: 'hgkg', fare: 80, estimation: 5, vname: 'boxe', status: false },
      { packages: 0, type: 'Luxurious', fare: 43, estimation: 5, vname: 'fibro', status: false },
      { packages: 0, type: 'Luxurious', fare: 90, estimation: 5, vname: 'max mini', status: true },
      { packages: 0, type: 'normal', fare: 100, estimation: 5, vname: 'micro', status: true }
    ];
  }

}
