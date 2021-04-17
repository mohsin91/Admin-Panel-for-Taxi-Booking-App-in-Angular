import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VehiclebrandeditService {
      url = environment.Url;
      constructor(private http:HttpClient,
        private cookie: CookieService) { }
       // vehiclebrand Edit
       vehiclebrandEdit(data) {
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.post(`${this.url}/vehicleBrandEdit`,data,{
           headers: httpheaders,
           observe: 'response'
         });
       }
      // get countries
      getcountry(){
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        return this.http.get(`${this.url}/countryView`,{
          headers: httpheaders,
          observe: 'response'
        });
      }         
       // get vehiclebrand
       getvehiclebrand(id){     
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.get(`${this.url}/getVehicleBrandView/${id}`,{
           headers: httpheaders,
           observe: 'response'
         });
       }
      }
    
    