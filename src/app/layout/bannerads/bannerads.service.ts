import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { BannerAdsList } from './banneradsvewlist.model';

@Injectable({
  providedIn: 'root'
})
export class BanneradsService {

  url = environment.Url;
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  }); 
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // banner ads List View
  banneradsListView(): Observable<BannerAdsList[]> {
    return this.http.get(`${this.url}/bannerAdsView`,{
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <BannerAdsList[]><unknown>res;
      })
      .catch(this.handleError);
  }
 
  // banner ads status update
  banneradsStatusUpdate(data) {
    return this.http.post(`${this.url}/bannerAdsStatusUpdate`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }   
}

