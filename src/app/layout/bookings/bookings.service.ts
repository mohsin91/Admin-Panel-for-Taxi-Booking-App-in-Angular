import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { BookingsList } from './bookingsviewlist.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  });
  url = environment.Url;
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // bookings List View
  bookingslistpageview(page): Observable<BookingsList[]> {
    return this.http.get(`${this.url}/bookingsListView/${page}`, {
      headers: this.httpheaders
    })
      .map((res) => {
        return <BookingsList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // booking search data List View
  bookingsearchdataView(name): Observable<BookingsList[]> {
    return this.http.get(`${this.url}/commonSearchViewPage/${JSON.stringify(name)}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <BookingsList[]><unknown>res;
      })
      .catch(this.handleError);
  } 
      // return this.http.get(`${this.url}/bookingsListView/${page}`, {
      //   headers: this.httpheaders,
      //   observe: 'response'
      // });  
}

