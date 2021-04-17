import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationViewList } from './pushnotificationview.model';


@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

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
  // push user view List View
 pushviewListView(page): Observable<PushNotificationViewList[]> {
    return this.http.get(`${this.url}/usersPushNotificationView/${page}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <PushNotificationViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // push provider view List View
  pushproviderviewListView(page): Observable<PushNotificationViewList[]> {
    return this.http.get(`${this.url}/providersPushNotificationView/${page}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <PushNotificationViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // push User search data List View
  pushusersearchdataView(name): Observable<PushNotificationViewList[]> {
    return this.http.get(`${this.url}/usersPushNotificationSearchView/${name}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <PushNotificationViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // push provider search data List View
  pushprovidersearchdataView(name): Observable<PushNotificationViewList[]> {
    return this.http.get(`${this.url}/providerPushNotificationSearchView/${name}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <PushNotificationViewList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  // push notification send user
  userPushNotificationSend(data) {
    return this.http.post(`${this.url}/userPushNotificationSend`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }
  // push notification send provider
  providerPushNotificationSend(data) {
    return this.http.post(`${this.url}/providerPushNotificationSend`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }        
}


