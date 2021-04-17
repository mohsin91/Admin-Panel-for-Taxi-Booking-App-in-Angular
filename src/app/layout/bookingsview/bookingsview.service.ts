import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BookingsviewService {
  url = environment.Url;
  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  });
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  // get Bookings  view details
  getbookingsdataview(id) {
    return this.http.get(`${this.url}/getBookingsView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }
  // get provider Bookings  view details
  getproviderbookingsdataview(id) {
    return this.http.get(`${this.url}/getProviderLocationBookingsView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }  
}

