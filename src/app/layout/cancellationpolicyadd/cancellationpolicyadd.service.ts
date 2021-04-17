import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CancellationpolicyaddService {

    url = environment.Url;
   
    constructor(private http:HttpClient,
      private cookie: CookieService) { }
    
     // cancellationpolicy add
     cancellationpolicyAdd(data){
      const httpheaders = new HttpHeaders({
        'Content-Type': [],
        'Accept': 'application/json',
        'Token': this.cookie.get('Token')
      });
       return this.http.post(`${this.url}/cancellationPolicyAdd`,data,{
         headers: httpheaders,
         observe: 'response'
       });
     }     
  }
  
  