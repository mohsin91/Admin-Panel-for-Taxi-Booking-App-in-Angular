import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, ActivatedRoute,RouterLinkActive } from '@angular/router';
import { GuardGuard } from '../guard.guard';
import { ValidationService } from './validation.service';
import { from } from 'rxjs';
import { EncryService } from '../encry.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl:string;
  loginForm:any;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private guard:GuardGuard,
    private encry:EncryService,
    private service:LoginService,
    private location: Location,
    private appspinner: AppComponent,
    private cookie: CookieService) {   
      this.loginForm = this.formBuilder.group({
        'email' : ['',[Validators.required,ValidationService.emailValidator]],
        'password' : ['',[Validators.required,Validators.minLength(9)]]
      });
    }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['return'] || 'dashboard';    
    if (this.cookie.get('Token')) {
      this.router.navigateByUrl(this.returnUrl);
    }           
  }
  login(){
    if(this.loginForm.dirty && this.loginForm.valid) {
      
      var data = {Email:this.loginForm.value.email,Password:this.loginForm.value.password};     
      this.service.login_authentication(data).subscribe(async res => {
        if(res.body['error'] === false ) {
        // sessionStorage.setItem('Token', res.body['data'].token );
          this.cookie.set('Token', res.body['data'].token );
        // console.log(this.cookie.get('token'));
            environment.swalalert('success',res.body['msg']).then(value => {
            if(value) {
              this.router.navigateByUrl(this.returnUrl);
            }
            });
        } else {
        environment.swalalert('error',res.body['msg']);
        }
      });
    }     
     else {
      environment.swalalert('warning','Validation');
      }
  }
}
