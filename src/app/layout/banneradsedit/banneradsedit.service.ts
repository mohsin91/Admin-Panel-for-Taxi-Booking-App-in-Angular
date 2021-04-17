import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BanneradseditService {

  url = environment.Url;
  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  });
  constructor(private http: HttpClient,
    private cookie: CookieService) { }


  // banner ads edit
  bannerAdsEdit(data) {
    return this.http.post(`${this.url}/bannerAdsEdit`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }

  // get banner ads data
  getbanneradsdata(id) {
    return this.http.get(`${this.url}/getbannerAdsView/${id}`, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }

  // fileupload add
  fileupload(data: File[], type, fname) {
    var formData = new FormData();
    Array.from(data).forEach(f => formData.append('file', f),
      formData.append('user', type + '|' + 'Replace' + '|' + fname))
    // formData.append('replacefilename', '');
    const httpheaders = new HttpHeaders({
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/fileUpload`, formData, {
      observe: 'response',
      headers: httpheaders
    });
  }
}

