import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { ProviderVehicleViewListModel } from './providervehicleview-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidervehicleviewService {

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


  // get providerVehicle providers List View
  getproviderViewlist(id) {
    return this.http.get(`${this.url}/getProviderDetailsListView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }   
  getprovidervehicleViewlist(id) {
    return this.http.get(`${this.url}/getProviderVehicleListView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }
  getprovidervehicledocumentsViewlist(id) {
    return this.http.get(`${this.url}/getProviderVehicleDocumentsDetailsListView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }             
  // cancellation Policy List View
  cancellationpolicyListView(type, page): Observable<ProviderVehicleViewListModel[]> {
    return this.http.post(`${this.url}/cancellationPolicyView/${page}`, { type: type }, {
      headers: this.httpheaders
    })
      .map((res) => {
        return <ProviderVehicleViewListModel[]><unknown>res;
      })
      .catch(this.handleError);
  }
  

  deleteSelfieService(id) {
    return this.http.get(`${this.url}/deleteSelfieApi/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  } 


  providerEdit(data) {
    return this.http.post(`${this.url}/providerVehicleEdit`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }

  providerVehiclDocEdit(data) {
    return this.http.post(`${this.url}/providerVehicleDocumentsEdit`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }

}

