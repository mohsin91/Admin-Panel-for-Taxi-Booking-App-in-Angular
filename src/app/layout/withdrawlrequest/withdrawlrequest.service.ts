import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { WithdrawlRequestViewModelList } from './withdrawlrequest.model';

@Injectable({
  providedIn: 'root'
})
export class WithdrawlrequestService {

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


  // get with drawl requests
  getwithdrawlrequestListView(page): Observable<WithdrawlRequestViewModelList[]> {
    return this.http.get(`${this.url}/getWithdrawlListView/${page}`, {
      headers: this.httpheaders
    })
      .map((res) => {
        return <WithdrawlRequestViewModelList[]><unknown>res;
      })
      .catch(this.handleError);
  }

    // withdrawl request status update
    withdrawlrequestStatusUpdate(data) {
      return this.http.post(`${this.url}/withDrawlRequestStatusUpdate`, data, {
        headers: this.httpheaders,
        observe: 'response'
      });
    }  

}

