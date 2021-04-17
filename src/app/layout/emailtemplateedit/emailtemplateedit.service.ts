import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmailtemplateeditService {

  url = environment.Url;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // email template Edit
  emailtemplateEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/emailTemplateEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // get emailtemplate pages
  getemailtemplatepages(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getEmailTemplatepagesView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }

}




