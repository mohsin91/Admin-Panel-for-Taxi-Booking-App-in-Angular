import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { VehicleBrandList } from './vehiclebrandlist.model';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class VehiclebrandviewService {

           url = environment.Url;
          private handleError(error: Response) {
            return Observable.throw(error.statusText);
        }
          constructor(private http: HttpClient,
            private cookie: CookieService) { }
          // vehicle List View
          vehiclebrandListView(page): Observable<VehicleBrandList[]> {
            const httpheaders = new HttpHeaders({
              'Content-Type': [],
              'Accept': 'application/json',
              'Token': this.cookie.get('Token')
            });            
            return this.http.get(`${this.url}/vehicleBrandView/${page}`,{
              headers: httpheaders
            })
            .map((res : Response) => {
                return <VehicleBrandList[]><unknown>res;
            })
            .catch(this.handleError);
          }    
        }
    