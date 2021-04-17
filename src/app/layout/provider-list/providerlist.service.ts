import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ProviderModelList } from './provider.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProviderlistService {
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
      // Provider List View
      usersListView(page): Observable<ProviderModelList[]> {     
        return this.http.get(`${this.url}/providerListView/${page}`,{
          headers: this.httpheaders
        })
        .map((res : Response) => {
            return <ProviderModelList[]><unknown>res;
        })
        .catch(this.handleError);
      }
      
      providerEdit(data) {
         return this.http.post(`${this.url}/providerEdit`,data,{
           headers: this.httpheaders,
           observe: 'response'
         });
      }
  // provider search data List View
  providersearchdataView(name): Observable<ProviderModelList[]> {
    return this.http.get(`${this.url}/commonSearchViewPage/${JSON.stringify(name)}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <ProviderModelList[]><unknown>res;
      })
      .catch(this.handleError);
  }       
    }
  