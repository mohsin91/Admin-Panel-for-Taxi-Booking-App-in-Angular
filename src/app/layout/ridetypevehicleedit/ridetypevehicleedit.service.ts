import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RidetypevehicleeditService {
  url = environment.Url;
  iconimgurl = environment.IconUrl;
  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  testimgadd(img) {
    return this.http.post(this.iconimgurl, img);
  }
  // ride vehicle edit
  ridevehicletypeEdit(data) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/rideVehicleTypeEdit`, data, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // get countries
  getcountry() {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/countryView`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // get state
  getstate() {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/stateView`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // get city
  getcity() {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/cityViewlist`, {
      headers: httpheaders,
      observe: 'response'
    });
  }
  // fileupload add
  fileupload(data: File[], type) {
    var formData = new FormData();
    Array.from(data).forEach(f => formData.append('file', f),
      formData.append('user', type + '|' + 'NotReplace'))
    // formData.append('replacefilename', '');
    const httpheaders = new HttpHeaders({
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/fileUpload`, formData, {
      headers: httpheaders,
      observe: 'response'
    });
  }  
  // get rideVehicletype pages
  getridevehicletypepages(id) {
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.get(`${this.url}/getRideVehicleTypepagesView/${id}`, {
      headers: httpheaders,
      observe: 'response'
    });
  }  
}
