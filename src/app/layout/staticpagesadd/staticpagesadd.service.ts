import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StaticpagesaddService {
  
    url = environment.Url;   
    constructor(private http:HttpClient,
      private cookie: CookieService) { }
    
     // static pages add
     staticpagesAdd(data){
       const httpheaders = new HttpHeaders({
         'Content-Type': [],
         'Accept': 'application/json',
         'Token': this.cookie.get('Token')
       });
       return this.http.post(`${this.url}/staticPagesAdd`,data,{
         headers: httpheaders,
         observe: 'response'
       });
     }
      
  }
  
