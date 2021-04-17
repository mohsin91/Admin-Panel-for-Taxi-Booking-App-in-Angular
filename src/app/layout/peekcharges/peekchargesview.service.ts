import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { PeekChargesList } from './peekchargeslist.model';

@Injectable({
  providedIn: 'root'
})
export class PeekchargesviewService {

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
  // peek charges List View
  peekChargesListView(page): Observable<PeekChargesList[]> {
    return this.http.get(`${this.url}/getPeekChargesListView/${page}`, {
      headers: this.httpheaders
    }).map((res: Response) => {
        return <PeekChargesList[]><unknown>res;
      })
      .catch(this.handleError);
  } 
}
