import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ValidationService } from '../login/validation.service';
import { ApiserviceService } from '../service/apiservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm:any;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private service:ApiserviceService,
    private formbuilder:FormBuilder
  ) 
  { 
    this.signupForm = this.formbuilder.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,ValidationService.emailValidator]],
      mobile:['',[Validators.required,Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(9)]]
    })
  }

  ngOnInit() {
  }
  FormBuilder
  signup(){
    if(this.signupForm.dirty && this.signupForm.valid) {
      
      var data = {username:this.signupForm.value.username,mobile:this.signupForm.value.mobile,email:this.signupForm.value.email,password:this.signupForm.value.password};     
      this.service.signup(data).subscribe(res => {
        console.log(res.body);
      });
    }     
     else {
        alert("Validation Required!!!");
      }
  }

}
