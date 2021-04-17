import { Component, OnInit } from '@angular/core';
import { Route,Router,ActivatedRoute,CanActivate,RouterStateSnapshot } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router : Router,
    private cookie: CookieService
  ) { }

  ngOnInit() {
  }
  logout(){
    this.cookie.delete('Token');    
    // sessionStorage.removeItem('accessToken');
    // sessionStorage.clear();
    this.cookie.deleteAll();
    this.router.navigate(['']);
  }

}
