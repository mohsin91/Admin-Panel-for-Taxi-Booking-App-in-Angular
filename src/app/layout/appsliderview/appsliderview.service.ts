import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppSliderList } from './appsliderviewlist.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppsliderviewService {
  url = environment.Url;
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // app slider List View
  appsliderListView(page): Observable<AppSliderList[]> {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    }); 
    return this.http.get(`${this.url}/appSliderView/${page}`,{
      headers: httpheaders
    })
      .map((res: Response) => {
        return <AppSliderList[]><unknown>res;
      })
      .catch(this.handleError);
  }

  // delete slider view
  appsliderdelete(id) {
    var iddata = {id: id}
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/appSliderDelete`, iddata, {
      headers: httpheaders,
      observe: 'response'
    });
  }   
}

