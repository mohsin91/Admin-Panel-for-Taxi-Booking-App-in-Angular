import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CancellationpolicyList } from './cancellationpolicyviewlist.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CancellationpolicyviewService {
 
  url = environment.Url;
    private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
    constructor(private http: HttpClient,
      private cookie: CookieService) { }
    // cancellation Policy List View
    cancellationpolicyListView(type,page): Observable<CancellationpolicyList[]> {
      const httpheaders = new HttpHeaders({
        'Content-Type': [],
        'Accept': 'application/json',
        'Token': this.cookie.get('Token')
      });      
      return this.http.post(`${this.url}/cancellationPolicyView/${page}`,{type:type},{
        headers: httpheaders
      })
      .map((res) => {
          return <CancellationpolicyList[]><unknown>res;
      })
      .catch(this.handleError);
    }    
  }
  
