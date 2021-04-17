import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { DashboardList } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardviewService {
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
  // Dashboard List View
  dashboardListView(): Observable<DashboardList[]> {
    return this.http.get(`${this.url}/dashboardListView`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <DashboardList[]><unknown>res;
      })
      .catch(this.handleError);
  }
}
