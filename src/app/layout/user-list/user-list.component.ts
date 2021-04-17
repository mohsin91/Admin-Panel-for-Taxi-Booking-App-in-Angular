import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { GuardGuard } from 'src/app/guard.guard';
import { UserListService } from './user-list.service';
import { UserListModel } from './user-list.model'
import { UserModelList } from './user.model';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ParentAppUserModel } from './parentUser.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  returnUrl: any;
  page: number = 1;
  commonpage: number = 1;
  sessionpage: Number;
  pages: any;
  searchdata: String;
  searchList="";
  usermodel: UserListModel;
  result: ParentAppUserModel[];
  sortByNumber:any;
  sortingOrder:boolean=false;
  sortingNumber:number;
  sortClass:any;
  sortClass1:any='sort-by';
  sortClass2:any='sort-by';
  sortClass3:any='sort-by';
  sortClass4:any='sort-by';
  sortClass5:any='sort-by';
  sortClass6:any='sort-by';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: UserListService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }
  ngOnInit() {
    // this.sessionpage = parseInt(sessionStorage.getItem('userlist'));
    // if( stringify(this.sessionpage) === 'NaN' ) {
    //     this.page = 1;   
    // } else {
    //     this.page = this.sessionpage;       
    // }
this.sortClass='sort-by';
    this.route.paramMap.subscribe(params => {
      let page = params.get("page");
      page = page || "1";
      if (page) {
        this.getUsers(Number(page));
      }
    });

  }
  getUsersSerchPage(page) {
    if (this.searchdata !== undefined) {
      if (this.searchdata.length > 0) {
        this.findname(this.searchdata);
      } else {
        this.getUsers(page);
      }
    } else {
      this.getUsers(page);
    }
  }


  getUsers(page = 1) {
    this.page = page;
    this.appspinner.spinnerAlert('show');
    this.service.usersListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
      } else {
        this.usermodel = new UserListModel(res['error'], res['msg'], res['data']);

        if (this.usermodel['data'].data.length > 0) {
          this.pages = this.usermodel['data'].Count[0].total;
          this.result = this.usermodel['data'].data;
        } else {
          environment.swalalert('nodata', 'No Data Available ');
        }

        this.appspinner.spinnerAlert('hide');
      }
    },
      (err) => {
        console.log(err);
        this.appspinner.spinnerAlert('hide');
      })
  }

  reset() {
    this.searchdata = '';
    this.getUsers(this.commonpage);
  }

  findname(search) {
    debugger;
    if(this.sortByNumber==undefined){
      this.sortByNumber='createdAt';
    }
    if(this.sortingNumber==undefined){
      this.sortingNumber=-1;
      this.sortClass='headerSortUp';
    }
    if(this.searchdata==undefined){
      this.searchdata="";
    }
    var data = { search: this.searchdata, typename: 'users', page: this.page,sort:this.sortByNumber,order:this.sortingNumber  }
    this.service.usersearchdataView(data).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
        // this.appspinner.spinnerAlert('hide');
      } else {
        this.usermodel = new UserListModel(res['error'], res['msg'], res['data']);
        if (this.usermodel['data'].data.length > 0) {
          this.pages = this.usermodel['data'].Count[0].total;
          this.result = this.usermodel['data'].data;
          console.log(this.result);
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }
  sortOrder(e,sortindex){
debugger;
this.sortByNumber=e;
// this.sortClass+''+e[1]='';
this.sortingOrder=!this.sortingOrder;
if(this.sortingOrder==false){
this.sortingNumber=-1;
if(sortindex==1){
  this.sortClass1='headerSortUp selectedOption';
  this.sortClass2='sort-by';
  this.sortClass3='sort-by'; 
  this.sortClass4='sort-by'; 
  this.sortClass5='sort-by'; 
  this.sortClass6='sort-by'; 
}
else if(sortindex==2){
  this.sortClass2='headerSortUp selectedOption';
  this.sortClass1='sort-by';
  this.sortClass3='sort-by'; 
  this.sortClass4='sort-by'; 
  this.sortClass5='sort-by'; 
  this.sortClass6='sort-by'; 
}
else if(sortindex==3){
  this.sortClass3='headerSortUp selectedOption';
  this.sortClass2='sort-by';
  this.sortClass1='sort-by'; 
  this.sortClass4='sort-by'; 
  this.sortClass5='sort-by'; 
  this.sortClass6='sort-by'; 
}
else if(sortindex==4){
  this.sortClass4='headerSortUp selectedOption';
  this.sortClass2='sort-by';
  this.sortClass3='sort-by'; 
  this.sortClass1='sort-by'; 
  this.sortClass5='sort-by'; 
  this.sortClass6='sort-by'; 
}
else if(sortindex==5){
  this.sortClass5='headerSortUp selectedOption';
  this.sortClass2='sort-by';
  this.sortClass3='sort-by'; 
  this.sortClass4='sort-by'; 
  this.sortClass1='sort-by'; 
  this.sortClass6='sort-by'; 
}
else if(sortindex==6){
  this.sortClass6='headerSortUp selectedOption';
  this.sortClass2='sort-by';
  this.sortClass3='sort-by'; 
  this.sortClass4='sort-by'; 
  this.sortClass5='sort-by'; 
  this.sortClass1='sort-by'; 
}

}
else{
  this.sortingNumber=1;
  if(sortindex==1){
    this.sortClass1='headerSortDown selectedOption';
    this.sortClass2='sort-by';
    this.sortClass3='sort-by'; 
    this.sortClass4='sort-by'; 
    this.sortClass5='sort-by'; 
    this.sortClass6='sort-by'; 
  }
  else if(sortindex==2){
    this.sortClass2='headerSortDown selectedOption';
    this.sortClass1='sort-by';
    this.sortClass3='sort-by'; 
    this.sortClass4='sort-by'; 
    this.sortClass5='sort-by'; 
    this.sortClass6='sort-by'; 
  }
  else if(sortindex==3){
    this.sortClass3='headerSortDown selectedOption';
    this.sortClass2='sort-by';
    this.sortClass1='sort-by'; 
    this.sortClass4='sort-by'; 
    this.sortClass5='sort-by'; 
    this.sortClass6='sort-by'; 
  }
  else if(sortindex==4){
    this.sortClass4='headerSortDown selectedOption';
    this.sortClass2='sort-by';
    this.sortClass3='sort-by'; 
    this.sortClass1='sort-by'; 
    this.sortClass5='sort-by'; 
    this.sortClass6='sort-by'; 
  }
  else if(sortindex==5){
    this.sortClass5='headerSortDown selectedOption';
    this.sortClass2='sort-by';
    this.sortClass3='sort-by'; 
    this.sortClass4='sort-by'; 
    this.sortClass1='sort-by'; 
    this.sortClass6='sort-by'; 
  }
  else if(sortindex==6){
    this.sortClass6='headerSortDown selectedOption';
    this.sortClass2='sort-by';
    this.sortClass3='sort-by'; 
    this.sortClass4='sort-by'; 
    this.sortClass5='sort-by'; 
    this.sortClass1='sort-by'; 
  }
  

}
if(this.searchdata==undefined){
  this.searchdata="";
}
this.findnameSort();

  }


  findnameSort() {
    debugger;
    var data = { search: this.searchdata, typename: 'users', page: this.page,sort:this.sortByNumber,order:this.sortingNumber }
    this.service.usersearchdataView(data).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
        // this.appspinner.spinnerAlert('hide');
      } else {
        this.usermodel = new UserListModel(res['error'], res['msg'], res['data']);
        if (this.usermodel['data'].data.length > 0) {
          this.pages = this.usermodel['data'].Count[0].total;
          this.result = this.usermodel['data'].data;
          console.log(this.result);
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }

  deleteUser(index){
    debugger;
    environment.swalalert('delete', 'Delete').then(value => {
      if (value) {
        this.service.deleteUser(this.result[index]._id).subscribe((res) => {
          if (res['error']) {
            // environment.swalalert('nodata', res['msg']);
            // this.appspinner.spinnerAlert('hide');
          } else {
            this.usermodel = new UserListModel(res['error'], res['msg'], res['data']);
            if (this.usermodel['data'].data.length > 0) {
              this.pages = this.usermodel['data'].Count[0].total;
              this.result = this.usermodel['data'].data;
              console.log(this.result);
              this.appspinner.spinnerAlert('hide');
            } else {
              environment.swalalert('nodata', 'No Data Available ');
              this.appspinner.spinnerAlert('hide');
            }
          }
        },
          (err) => {
            console.log(err);
          });
      }
    });   




   

  }


}
