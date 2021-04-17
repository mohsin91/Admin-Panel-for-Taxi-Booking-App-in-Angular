import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppslidereditService {

  url = environment.Url;

  constructor(private http: HttpClient,
    private cookie: CookieService) { }


  // appslider edit
  appSliderEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/appSliderEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }

  // get appslider
  getappSlider(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getappSliderView/${id}`, {
      headers: httpheaders,
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

