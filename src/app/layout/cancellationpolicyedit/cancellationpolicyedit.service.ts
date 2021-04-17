import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CancellationpolicyeditService {
      url = environment.Url;
     
      constructor(private http:HttpClient,
        private cookie: CookieService) { }
      
       // cancellationpolicy edit
       cancellationpolicyEdit(data){
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.post(`${this.url}/cancellationPolicyEdit`,data,{
           headers: httpheaders,
           observe: 'response'
         });
       }

       // get city
       getcancellationpolicy(id){     
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });
         return this.http.get(`${this.url}/getCancellationPolicyView/${id}`,{
           headers: httpheaders,
           observe: 'response'
         });
       }               
    }
    
