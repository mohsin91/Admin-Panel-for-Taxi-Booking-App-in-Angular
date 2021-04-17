import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list/user-list.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../config/config';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import {ApiserviceService} from '../../service/apiservice.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
    userId: string;
    allAccounts;
    selectedType;
    imgpath:any;
    latitude = 33.537928;
  longitude = 73.101301;
  mapType = 'roadmap';
  getapidata:any;
    constructor(private service: UserListService, private appComponent: AppComponent, private activatedRoute: ActivatedRoute,private apiService:ApiserviceService) { 
      
    }
    ngOnInit(): void {
        this.appComponent.spinnerAlert('show');
        this.activatedRoute.paramMap.subscribe(params => {
            this.service.userDetailView(params.get('id')).subscribe((res) => {
                this.appComponent.spinnerAlert('hide');
                if (res.error) {
                    environment.swalalert('nodata', res['msg']);
                } else {
                    this.allAccounts = res.data;
                    debugger;
                    if(this.allAccounts[0].data.img_path==null ||this.allAccounts[0].data.img_path==""||this.allAccounts[0].data.img_path==undefined){
                        this.imgpath='assets/img/user.png';
                    }
                    else{
                    this.imgpath=environment.ParentAppBaseUrl+''+this.allAccounts[0].data.img_path;
                    }
                    this.selectedType = res.data[0].key;
                    debugger;
                    this.apiService.getlatlng(this.allAccounts[0].data.address).then(res =>{
                        debugger;
                        console.log(res.results[0].geometry.location)
                        this.latitude=res.results[0].geometry.location.lat;
                        this.longitude=res.results[0].geometry.location.lng;
                    });
                }
            },
                (err) => {
                    console.log(err);
                })
        });
    }
    
    displayValue(value){
        return typeof value == typeof {} ? JSON.stringify(value) : value;
    }

}
