import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-servicelocation',
  templateUrl: './servicelocation.component.html',
  styleUrls: ['./servicelocation.component.css']
})
export class ServicelocationComponent implements OnInit {


    page: Number = 1;
    result: any;
  constructor() { }

  ngOnInit() {
    // environment.swalalert('nodata', 'Under Construction');
    this.result = [
      { country: 'India', state: 'tamil nadu', city: 'chennai, madurai, coimbatore, tangore', status: true },
      { country: 'United States', state: 'New York', city: 'Manhattan, Brooklyn, Queens, The Bronx, Staten Island', status: false },
      { country: 'Brazil', state: ' São Paulo', city: 'Campinas, Guarulhos, São Bernardo do Campo, Santo André, São José dos Campos, Osasco', status: true },
      { country: 'United States', state: 'Mexico', city: 'Ecatepec, Puebla, Juárez, León, Zapopan, Monterrey', status: true }
    ];
  }

}
