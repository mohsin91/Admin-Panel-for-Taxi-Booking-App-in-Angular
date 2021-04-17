import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { CountryList } from './countrylist.model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CountryviewService {
      url = environment.Url;
      private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
      constructor(private http: HttpClient,
        private cookie: CookieService) { }

      // Users List View
      countryListView(page): Observable<CountryList[]> {
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });
        return this.http.get(`${this.url}/countryPageView/${page}`,{
          headers: httpheaders
        })
        .map((res : Response) => {
            return <CountryList[]><unknown>res;
        })
        .catch(this.handleError);
      }    
    }
