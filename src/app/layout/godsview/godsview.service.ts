import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { GodsViewList } from './godsviewlist.model';

@Injectable({
  providedIn: 'root'
})
export class GodsviewService {

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
  // gods provider view List View
  godsproviderviewListView(page): Observable<GodsViewList[]> {

    return this.http.get(`${this.url}/providersPushNotificationView/${page}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <GodsViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // provider search data List View
  providersearchdataView(name): Observable<GodsViewList[]> {
    return this.http.get(`${this.url}/commonSearchViewPage/${JSON.stringify(name)}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <GodsViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }    
}


