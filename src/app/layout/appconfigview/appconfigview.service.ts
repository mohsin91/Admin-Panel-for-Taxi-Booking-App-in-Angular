import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfigModelList } from './appconfigview.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppconfigviewService {
 
      url = environment.Url;      
      private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
      constructor(private http: HttpClient,
        private cookie: CookieService) {      
       }       
      // Appconfig List View
      appConfigListView(): Observable<AppConfigModelList[]> {
        const httpheaders = new HttpHeaders({
          'Content-Type': [],
          'Accept': 'application/json',
          'Token': this.cookie.get('Token')
        });         
        return this.http.get(`${this.url}/appConfigListView`,{
          headers: httpheaders          
        })
        .map((res : Response) => {
            return <AppConfigModelList[]><unknown>res;
        })
        .catch(this.handleError);
      }      
       // appconfig edit
       appconfigEdit(data){
         const httpheaders = new HttpHeaders({
           'Content-Type': [],
           'Accept': 'application/json',
           'Token': this.cookie.get('Token')
         });          
         return this.http.post(`${this.url}/appConfigEdit`,data,{
           headers: httpheaders,
           observe: 'response'
         });
       }        
    }
  