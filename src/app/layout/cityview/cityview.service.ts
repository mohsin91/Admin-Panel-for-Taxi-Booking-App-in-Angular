import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CityList } from './citylist.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CityviewService {
url = environment.Url;
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // State List View
  cityListView(page): Observable<CityList[]> {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });    
    return this.http.get(`${this.url}/cityView/${page}`, {
      headers: httpheaders
    })
    .map((res : Response) => {
        return <CityList[]><unknown>res;
    })
    .catch(this.handleError);
  }    
}
