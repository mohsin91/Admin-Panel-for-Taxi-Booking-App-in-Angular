import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { ManualBookAddModel } from './manualbookadd.model';

@Injectable({
  providedIn: 'root'
})
export class ManualbookService {

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
  // manual booking users get List View
  getBookingUsersListView(data): Observable<ManualBookAddModel[]> {
   
    return this.http.get(`${this.url}/getManualBookingUsersCheckList/${data}`,{
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <ManualBookAddModel[]><unknown>res;
      })
      .catch(this.handleError);
  }
  rideVehicleData() {
  return this.http.get(`${this.url}/rideManualBookingVehicleTypeView`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }

}


