import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BanneradsaddService {

  url = environment.Url;
  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  });
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  //banner add
  banneradsadd(data) {
    return this.http.post(`${this.url}/bannerAdsAdd`, data, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }
  // fileupload add
  fileupload(data: File[], type) {
    var formData = new FormData();
    Array.from(data).forEach(f => formData.append('file', f),
      formData.append('user', type + '|' + 'NotReplace'))
    return this.http.post(`${this.url}/fileUpload`, formData, {
      headers: this.httpheaders,
      observe: 'response'
    });
  }
}

