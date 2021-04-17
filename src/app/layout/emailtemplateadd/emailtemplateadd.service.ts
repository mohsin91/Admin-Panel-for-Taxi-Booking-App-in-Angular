import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmailtemplateaddService {

  url = environment.Url;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  // email template add
  emailtemplateAdd(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/emailTemplateAdd`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }

}
