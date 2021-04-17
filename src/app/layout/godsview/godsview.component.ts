import { Component, OnInit, HostListener, DoCheck, OnChanges ,AfterViewInit } from '@angular/core';
import * as $ from "../../../assets/js/jquery.3.2.1.min.js";
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { GodsviewService } from './godsview.service.js';
import { GodsViewModel } from './godsview.model.js';
import { GodsViewList } from './godsviewlist.model.js';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-godsview',
  templateUrl: './godsview.component.html',
  styleUrls: ['./godsview.component.css']
})
export class GodsviewComponent implements OnInit {
  result: any;
  page: Number = 1;
  pages: any;
  godsview: GodsViewModel;
  godsviewlist: GodsViewList[];
  userpage: Number = 0;
  providerpage: Number = 0;  
  commonpage: Number = 1;
  searchdata: String;  
  latitude: any = 13.051577;
  longitude: any = 80.245643;
  mapType: String = 'roadmap';
  travelMode: String = 'DRIVING';
  origin: any;
  destination: any;
  icon = {
    url: 'assets/img/caricon.png',
    scaledSize: {
      width: 60,
      height: 50
    }
  };   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private service: GodsviewService,
    private appspinner: AppComponent,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    // environment.swalalert('underconst', 'This Page has Under Contruction Work ');
    $(document).ready(function () {
      $('#search').on("click", (function (e) {
        $(".form-group").addClass("sb-search-open");
        e.stopPropagation()
      }));
      $(document).on("click", function (e) {
        if ($(e.target).is("#search") === false && $(".form-control").val().length == 0) {
          $(".form-group").removeClass("sb-search-open");
        }
      });
      $(".form-control-submit").click(function (e) {
        $(".form-control").each(function () {
          if ($(".form-control").val().length == 0) {
            e.preventDefault();
            $(this).css('border', '2px solid #ffcd3c');
          }
        })
      })
    })
    this.getProvidergodseye(this.page);
  }

  handleScroll(event: ScrollEvent, type,pageno) {
   
    var fnlht = event.originalEvent.srcElement.scrollHeight;
  if ($('#menu2').scrollTop() + $('#menu2').height() === fnlht) {
    this.providerpage += pageno    
    this.service.godsproviderviewListView(this.providerpage).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
      } else {
        this.godsview = new GodsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.godsview['data'][0].data.length > 0) {
          // this.result = this.result.concat(this.godsview['data'][0].data);
        } else {
          // environment.swalalert('nodata', 'No Data Available ');
        }
      }
    },
      (err) => {
        console.log(err);
      });

  }
  }  

  getProvidergodseye(page) {
    this.appspinner.spinnerAlert('show');
    this.service.godsproviderviewListView(page).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.godsview = new GodsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.godsview['data'][0].data.length > 0) {
          this.pages = this.godsview['data'][0].Count;
          this.result = this.godsview['data'][0].data;
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


  reset() {
    this.searchdata = '';
    this.getProvidergodseye(this.commonpage);
  }

  findname(search) {
    var data = { search: search, typename: 'providers', page: this.page }
    this.service.providersearchdataView(data).subscribe((res) => {
      if (res['error']) {
        // environment.swalalert('nodata', res['msg']);
        // this.appspinner.spinnerAlert('hide');
      } else {
        this.godsview = new GodsViewModel(res['error'], res['msg'], res['data']);
        if (res['data'].length > 0 && this.godsview['data'][0].data.length > 0) {
          this.pages = this.godsview['data'][1].Count;
          this.result = this.godsview['data'][0].data;
          // this.pending = pen;
          console.log(this.result);


          this.appspinner.spinnerAlert('hide');
        } else {
          // environment.swalalert('nodata', 'No Data Available ');
          // this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      });
  }

}



