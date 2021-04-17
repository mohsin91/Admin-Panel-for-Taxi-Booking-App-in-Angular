import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PromocodeeditService {

  url = environment.Url;
  iconimgurl = environment.IconUrl;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  // promocodes edit
  promocodesEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/promoCodesEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }

  // get promo codes edit list
  getpromocodeslist(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getPromoCodesEditListView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
}
