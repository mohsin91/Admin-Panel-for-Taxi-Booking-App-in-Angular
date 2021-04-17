import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProviderListviewService {

  url = environment.Url;

  constructor(private http: HttpClient,
    private cookie: CookieService) { }



  // get provider
  getProvider(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getProviderView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // get Doc view provider
  getProviderDocView(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getProviderDocView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }  
  
  // provider list edit
  providerDocEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/providerDocEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }  
}
