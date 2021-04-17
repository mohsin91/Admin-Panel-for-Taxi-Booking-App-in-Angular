import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VehiclemodeleditService {
      
        url = environment.Url;
       
        constructor(private http:HttpClient,
          private cookie: CookieService) { }
        
         // vehicle model edit
         vehiclemodelEdit(data){
           const httpheaders = new HttpHeaders({
             'Content-Type': [],
             'Accept': 'application/json',
             'Token': this.cookie.get('Token')
           });
           return this.http.post(`${this.url}/vehicleModelEdit`,data,{
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
       
       // get vehicle Categories
       getvehiclecategories(){
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        return this.http.get(`${this.url}/vehicleCategories`,{
          headers: httpheaders,
          observe: 'response'
        });
      }     
       // get vehicle model
       getvehiclemodel(id){     
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.get(`${this.url}/getVehicleModelView/${id}`,{
           headers: httpheaders,
           observe: 'response'
         });
       }  
       // get vehicle Brand model
       getvehiclebrandmodel(id){     
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        debugger;
        return this.http.get(`${this.url}/getVehicleBrandModel/${id}`,{
          headers: httpheaders,
          observe: 'response'
        });
      } 
      
      
       // get vehicle Brand model
       getRideVehicleType(){     
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        debugger;
        return this.http.get(`${this.url}/getRideVehicleType`,{
          headers: httpheaders,
          observe: 'response'
        });
      } 
     
       //save Vehicle
       saveProvVehicle(data){     
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        debugger;
        return this.http.post(`${this.url}/saveProviderVehicle`,data,{
          headers: httpheaders,
          observe: 'response'
        });
      }
    }
  
    