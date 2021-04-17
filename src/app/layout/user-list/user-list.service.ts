import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { UserModelList } from './user.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
import { ParentAppUserModel } from './parentUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  httpheaders = new HttpHeaders({
    'Content-Type': [],
    'Accept': 'application/json',
    'Token': this.cookie.get('Token')
  });

  url = environment.Url;
  tempUrl='http://localhost:3000/api/users';
  
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: HttpClient,
    private cookie: CookieService) { }
  // Users List View
  usersListView(page): Observable<UserModelList[]> {
    return this.http.get(`${this.url}/usersListView/${page}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <UserModelList[]><unknown>res;
      })
      .catch(this.handleError);
    // return this.http.get(`${this.url}/usersListView/${page}`,{
    //   headers: this.httpheaders
    // })
    // .map((res : Response) => {
    //     return <ParentAppUserModel[]><unknown>res;
    // })
    // .catch(this.handleError);
  }

userDetailView(userId): Observable<any> {
  return this.http.get(`${this.url}/userDetailView/${userId}`, {
    headers: this.httpheaders
  })
    .map((res: Response) => {
      console.log(res);
      return res;

    })
    .catch(this.handleError);
}

  // User search data List View
  usersearchdataView(name): Observable<UserModelList[]> {
    return this.http.get(`${this.url}/parentUserSearchViewPage/${JSON.stringify(name)}`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        return <UserModelList[]><unknown>res;
      })
      .catch(this.handleError);
  }
  


  // User search data List View

  deleteUser(_Id){
    debugger;
     var userId={
       "Id":_Id
     };
    // userId.Id=_Id;
    const httpheaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json',
      'Token': this.cookie.get('Token')
    });
    return this.http.post(`${this.url}/deleteUser`,userId,{
      headers: httpheaders,
      observe: 'response'
    });
  }
  //VehicleCategories

  vehicleCategories(): Observable<any> {
    return this.http.get(`${this.url}/getVehicalCateg`, {
      headers: this.httpheaders
    })
      .map((res: Response) => {
        console.log(res);
        return res;
  
      })
      .catch(
        this.handleError
      );
  }


  
}
