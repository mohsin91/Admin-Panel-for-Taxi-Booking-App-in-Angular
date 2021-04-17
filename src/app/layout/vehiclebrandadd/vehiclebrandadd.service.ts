import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
  

@Injectable({
  providedIn: 'root'
})
export class VehiclebrandaddService {
  
    url = environment.Url;
   
    constructor(private http:HttpClient,
      private cookie: CookieService) { }
    
     // vehicle brand add
     vehiclebrandAdd(data){
       const httpheaders = new HttpHeaders({
         'Content-Type': [],
         'Accept': 'application/json',
         'Token': this.cookie.get('Token')
       });
       return this.http.post(`${this.url}/vehicleBrandAdd`,data,{
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
}
