import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  gmapsData: any = [];
  constructor(private http:HttpClient) { }
  static login_authentication(data: { email: any; password: any; }): any {
    throw new Error("Method not implemented.");
  }
  
 // url = 'http://localhost:3000/api/admin';
  url = environment.Url;
  
  login_authentication(data){
   const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/login`,data,{
      headers: httpheaders,
      observe: 'response'
    });
  }
  // Users List View
  usersListView(page){
    const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.http.get(`${this.url}/usersListView/${page}`,{
      headers: httpheaders,
      observe: 'response'
    });
  }
  // Provider List View
  providersListView(){
    const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.http.get(`${this.url}/providerListView`,{
      headers: httpheaders,
      observe: 'response'
    });
  }  

  signup(data){
    const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json'
     });
     return this.http.post(`${this.url}/signup`,data,{
       headers: httpheaders,
       observe: 'response'
     });
   }  
   // country add
   countryAdd(data){
    const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json'
     });
     return this.http.post(`${this.url}/countryAdd`,data,{
       headers: httpheaders,
       observe: 'response'
     });
   }     
     // Country List View
     countryView(page){
    const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.http.get(`${this.url}/countryView`,{
      headers: httpheaders,
      observe: 'response'
    });
  }
  getlatlng(address){
    debugger;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    var result;
    if(address=="" ||address==null ||address==undefined){
    address="west africa";
    var url='https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyALUdVelXMs_UMm3cBTP4-kl_B97yrHNds';
  }
    else{
    console.log(address.line1);
    var url='https://maps.googleapis.com/maps/api/geocode/json?address='+address.line1+'&key=AIzaSyALUdVelXMs_UMm3cBTP4-kl_B97yrHNds';
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // site that doesn’t send Access-Control-*
    return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.json())
    .then(contents => {console.log(contents)
     return contents;
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

    // return  this.http.get(url,{
    //   headers: httpheaders,
    //   observe: 'response'
    // });
  }
  
  
  
 
}
