import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { StaticPagesList } from './staticpagesviewlist.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StaticpagesviewService {
 
  url = environment.Url;
    private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
    constructor(private http: HttpClient,
      private cookie: CookieService) { }
    // Static pages List View
    staticpagesListView(page): Observable<StaticPagesList[]> {
      const httpheaders = new HttpHeaders({
        'Content-Type': [],
        'Accept': 'application/json',
        'Token': this.cookie.get('Token')
      });      
      return this.http.get(`${this.url}/staticPagesListView/${page}`,{
        headers: httpheaders
      })
      .map((res : Response) => {
          return <StaticPagesList[]><unknown>res;
      })
      .catch(this.handleError);
    }    
  }
  
