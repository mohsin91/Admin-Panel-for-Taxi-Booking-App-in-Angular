import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { PromoCodesList } from './promocodeslist.model';

@Injectable({
  providedIn: 'root'
})
export class PromocodesService {

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
  // promo codes List View
  promocodesListView(): Observable<PromoCodesList[]> {
    return this.http.get(`${this.url}/getPromoCodesListView`, {
      headers: this.httpheaders
    }).map((res: Response) => {
        return <PromoCodesList[]><unknown>res;
      })
      .catch(this.handleError);
  }

  // promocodes status update
  promocodeStatusUpdate(data) {
    return this.http.post(`${this.url}/promocodesStatusUpdate`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }  
}
