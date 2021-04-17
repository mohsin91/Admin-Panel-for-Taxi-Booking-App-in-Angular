import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CityaddService {
  url = environment.Url;
 
  constructor(private http:HttpClient,
    private cookie: CookieService) { }
  
   // city add
   cityAdd(data){
     const httpheaders = new HttpHeaders({
       'Content-Type': [],
       'Accept': 'application/json',
       'Token': this.cookie.get('Token')
     });
     return this.http.post(`${this.url}/cityAdd`,data,{
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
   // get state
   getstate(id) {
     const httpheaders = new HttpHeaders({
       'Content-Type': [],
       'Accept': 'application/json',
       'Token': this.cookie.get('Token')
     });
     return this.http.get(`${this.url}/stateListView/${id}`,{
       headers: httpheaders,
       observe: 'response'
     });
   }            
}
