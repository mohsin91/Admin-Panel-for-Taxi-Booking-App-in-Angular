import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { StateList } from './statelist.model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StateviewService {
url = environment.Url;
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // State List View
  stateListView(page): Observable<StateList[]> {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/stateView/${page}`, {
      headers: httpheaders
    })
    .map((res : Response) => {
        return <StateList[]><unknown>res;
    })
    .catch(this.handleError);
  }    
}
