import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RidetypeVehicleList } from './ridetypevehiclelist.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class RidetypevehicleviewService {
           url = environment.Url;
          private handleError(error: Response) {
            return Observable.throw(error.statusText);
        }
          constructor(private http: HttpClient,
            private cookie: CookieService) { }
          // Ride Type Vehicle List View
          ridetypevehicleListView(page): Observable<RidetypeVehicleList[]> {
            const httpheaders = new HttpHeaders({
              'Content-Type': [],
              'Accept': 'application/json',
              'Token': this.cookie.get('Token')
            });         
            return this.http.get(`${this.url}/rideVehicleTypeView/${page}`,{
              headers: httpheaders
            })
            .map((res : Response) => {
                return <RidetypeVehicleList[]><unknown>res;
            })
            .catch(this.handleError);
          }  
        rideVehicleStatusUpdate(data) {
            const httpheaders = new HttpHeaders({
              'Content-Type': [],
              'Accept': 'application/json',
              'Token': this.cookie.get('Token')
            });
          return this.http.post(`${this.url}/rideVehicleTypeStatusEdit`, data, {
              headers: httpheaders,
              observe: 'response'
            });
          }            
        }
    
