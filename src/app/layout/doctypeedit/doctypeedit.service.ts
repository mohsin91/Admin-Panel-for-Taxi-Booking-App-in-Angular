import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DoctypeeditService {
  getcountry(paramsid: any): any {
    throw new Error("Method not implemented.");
  } 
    url = environment.Url;
    constructor(private http:HttpClient,
      private cookie: CookieService) { }
     // doctype Edit
     doctypeEdit(data) {
       const httpheaders = new HttpHeaders({
         'Content-Type': [],
         'Accept': 'application/json',
         'Token': this.cookie.get('Token')
       });
       return this.http.post(`${this.url}/docTypeEdit`,data,{
         headers: httpheaders,
         observe: 'response'
       });
     }
     // get doctype
     getdoctype(id){     
       const httpheaders = new HttpHeaders({
         'Content-Type': [],
         'Accept': 'application/json',
         'Token': this.cookie.get('Token')
       });
       return this.http.get(`${this.url}/getDoctypeView/${id}`,{
         headers: httpheaders,
         observe: 'response'
       });
     }
    }
  
  