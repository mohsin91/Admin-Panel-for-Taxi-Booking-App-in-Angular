import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { ReviewManageViewModelList } from './reviewmanageview.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewmanagementService {
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


  // user provider Review managements
  getreviewmanageListView(type, page): Observable<ReviewManageViewModelList[]> {
    return this.http.post(`${this.url}/getUserProviderReviewManagement/${page}`, { type: type }, {
      headers: this.httpheaders
    })
      .map((res) => {
        return <ReviewManageViewModelList[]><unknown>res;
      })
      .catch(this.handleError);
  }

}

