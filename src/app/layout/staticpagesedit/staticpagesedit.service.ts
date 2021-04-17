import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StaticpageseditService {
 
      url = environment.Url;
      constructor(private http:HttpClient,
        private cookie: CookieService) { }
       // static pages Edit
       staticpagesEdit(data) {
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.post(`${this.url}/staticPagesEdit`,data,{
           headers: httpheaders,
           observe: 'response'
         });
       }
       // get static pages
       getstaticpages(id){     
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.get(`${this.url}/getStaticpagesView/${id}`,{
           headers: httpheaders,
           observe: 'response'
         });
       }
       
      }
    
    
  
