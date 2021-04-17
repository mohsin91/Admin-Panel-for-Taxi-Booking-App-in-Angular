import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class PeekchargeseditService {

  url = environment.Url;
  iconimgurl = environment.IconUrl;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  // peek charges edit
  peekChargesEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/peekChargesEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }

  // get peek charges edit list
  getpeekChargesEditlist(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getPeekChargesEditListView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
}
