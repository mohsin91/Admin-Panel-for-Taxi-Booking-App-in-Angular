import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class PromocodeaddService {
  url = environment.Url;
  iconimgurl = environment.IconUrl;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  testimgadd(img) {
    return this.http.post(this.iconimgurl, img);
  }
  // promo codes add
  promocodesAdd(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/promoCodesAdd`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }

}


