import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VehiclemodeladdService {
    
      url = environment.Url;
     
      constructor(private http:HttpClient,
        private cookie: CookieService) { }
      
       // vehicle model add
       vehiclemodelAdd(data){
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.post(`${this.url}/vehicleModelAdd`,data,{
           headers: httpheaders,
           observe: 'response'
         });
       }
     // get vehicle brand
     getvehiclebrand(){
       const httpheaders = new HttpHeaders({
         'Content-Type': [],
         'Accept': 'application/json',
         'Token': this.cookie.get('Token')
       });
       return this.http.get(`${this.url}/vehicleBrandView`,{
         headers: httpheaders,
         observe: 'response'
       });
     }   
  }
