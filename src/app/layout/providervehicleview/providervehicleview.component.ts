import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GuardGuard } from 'src/app/guard.guard';
import { EncryService } from 'src/app/encry.service';
import { environment } from '../../../environments/environment';
import { AppComponent } from 'src/app/app.component';
import { ProvidervehicleviewService } from './providervehicleview.service';
import { ProviderVehicleViewModelList } from './providervehicleview.model';
import { ProviderVehicleViewListModel } from './providervehicleview-list.model';
import{VehiclemodeleditService} from '../vehiclemodeledit/vehiclemodeledit.service';
import{ProviderVehicle} from '../provider-list/provider.model';
declare var $:any;
@Component({
  selector: 'app-providervehicleview',
  templateUrl: './providervehicleview.component.html',
  styleUrls: ['./providervehicleview.component.css']
})
export class ProvidervehicleviewComponent implements OnInit {

  paramsid: any;
  cancelEditForm: any;
  providerview: ProviderVehicleViewModelList;
  providermodel: ProviderVehicleViewListModel;
  result: any = [];
  docresult: any = [];  
  Id: Number;
  ProviderId: Number;
  pImage: String;
  pFirstName: String;
  pLastName: String;
  pEmail: String;
  pMobile: Number;
  pstatus: String;
  pExt: Number;   
  VId: Number;
  VVehicleNumber: String;
  VVehicleImage: String;
  VVehicleBrandName: String;
  VVehicleModelName: String;
  VStatus: String;
  Vr: any;
  Vi: any;
  RideVehicleTypeName: String;
  VColor: String;
  vehiclebrandlist : any =[];
  vehiclemodellist : any =[];
  rideVehicleType : any =[];
  vehicleBrand:any;
  vehicleBrandModel:any;
  rideType:any;
  newVehicle:ProviderVehicle;
  errorMessage:any=[];
  vehicleCategories:any=[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guard: GuardGuard,
    private encry: EncryService,
    private service: ProvidervehicleviewService,
    private appspinner: AppComponent,
    private vehicleServ:VehiclemodeleditService) {
      
     
  }

  ngOnInit() {
   
    this.newVehicle= new ProviderVehicle();
    this.appspinner.spinnerAlert('show');
    this.route.params.subscribe(params => {
      this.paramsid = params.id;
      this.newVehicle.Id=params.id;
      this.getProfileView(this.paramsid);      
    });
    
  
  }
  ngAfterViewInit() {
    // loading templates js after dom render
    $(document).ready(function(){
      $('.delete').click(function(){
          $(this).parent().remove();
          return false;
      });
  
  });
}

  getProfileView(id) {
    this.appspinner.spinnerAlert('show');
    this.service.getproviderViewlist(this.paramsid).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        this.providermodel = new ProviderVehicleViewListModel(res.body['error'], res.body['msg'], res.body['data']);
        var rs = this.providermodel.data;
        this.providerview = this.providermodel.data
        this.pImage = this.providerview.Image;
        this.Id = this.providerview.Id;
        this.pFirstName = this.providerview.FirstName;
        this.pLastName = this.providerview.LastName;
        this.pEmail = this.providerview.Email;
        this.pExt = this.providerview.ExtCode;
        this.pMobile = this.providerview.Mobile;
        this.pstatus = this.providerview.Status;
        this.appspinner.spinnerAlert('hide');
      }
    },
      (err) => {
        console.log(err);
      })
  }
  getprovidervehicle(id) {
  this.service.getprovidervehicleViewlist(id).subscribe((res) => {
      if (res['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        debugger;
        this.providermodel = new ProviderVehicleViewListModel(res['error'], res['msg'], res['body']);
        if (this.providermodel['data']) {
          this.result = this.providermodel['data'];
          this.appspinner.spinnerAlert('hide');
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      })
}

  getprovidervehicledocuments(id) {
    debugger;
    this.service.getprovidervehicledocumentsViewlist(id).subscribe((res) => {
      if (res.body['error']) {
        environment.swalalert('nodata', res['msg']);
        this.appspinner.spinnerAlert('hide');
      } else {
        debugger;
        this.providermodel = new ProviderVehicleViewListModel(res.body['error'], res.body['msg'], res.body['data']);
        if (this.providermodel['data'].length > 0) {
          debugger;
          this.docresult = this.providermodel['data'];
          this.appspinner.spinnerAlert('hide');
          this.vehicleServ.getvehiclebrand().subscribe((res)=>{
         debugger;
          this.vehiclebrandlist=res.body;
          this.vehiclebrandlist=this.vehiclebrandlist.data;
          console.log(this.vehiclebrandlist);
          })
          this.vehicleServ.getRideVehicleType().subscribe((res)=>{
         
          this.rideVehicleType=res.body;
          this.rideVehicleType=this.rideVehicleType.data;
          console.log(this.rideVehicleType);
          })
          this.vehicleServ.getvehiclecategories().subscribe((res)=>{
            debugger;
          this.vehicleCategories=res.body;
          this.vehicleCategories=this.vehicleCategories.data;
          console.log(this.vehicleCategories);
          })
          this.vehicleServ.getvehiclebrandmodel(this.newVehicle.Brand).subscribe((res)=>{
            debugger;
          this.vehiclemodellist=res.body;
          this.vehiclemodellist=this.vehiclemodellist.data;
          console.log(this.vehiclemodellist);
          })
        } else {
          environment.swalalert('nodata', 'No Data Available ');
          this.appspinner.spinnerAlert('hide');
        }
      }
    },
      (err) => {
        console.log(err);
      })
  }

  getBrandModel(){
debugger;
    this.vehicleServ.getvehiclebrandmodel(this.newVehicle.Brand).subscribe((res)=>{
      debugger;
    this.vehiclemodellist=res.body;
    this.vehiclemodellist=this.vehiclemodellist.data;
    })

  }

  saveProviderVehicle(){
   
    debugger;
    this.vehicleServ.saveProvVehicle(this.newVehicle).subscribe((res)=>{
     debugger;
      this.errorMessage=res.body;
     if(this.errorMessage.error==true)
     {
      environment.swalalert('error',res.body['msg']);
     }
    
     
    // this.vehiclemodellist=res.body;
    // this.vehiclemodellist=this.vehiclemodellist.data;
    })
    
  }

  providerUpdate(id, status, r, i) {
    var data = { Id: { Id: id }, updata: { Status: status } };
    if (status === 'rejected') {
      environment.swalalert('delete', 'Rejected').then(value => {
        if (value) {
          this.service.providerEdit(data).subscribe((res) => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {
              if (res.body['error'] === false) {
                this.VStatus = status;
                this.getprovidervehicle(this.paramsid);
              } else {
                environment.swalalert('error', res.body['msg']);
              }
            }
          },
            (err) => {
              console.log(err);
            })
        }
      });

    } else {
      this.service.providerEdit(data).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', 'Approved Successfully').then(value => {
              if (value) {
                this.VStatus = status;
                this.result[i] = {
                  Id: r.Id,
                  VehicleNumber: r.VehicleNumber,
                  VehicleImage: r.VehicleImage,
                  VehicleBrandName: r.VehicleBrandName,
                  VehicleModelName: r.VehicleModelName,
                  Status: status
                };

              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      },
        (err) => {
          console.log(err);
        })
    }
  } 


  providerVehiclDocUpdate(id, status, r, i) {
    var data = { Id: { Id: id }, updata: { Status: status } };
    if (status === 'rejected') {
      environment.swalalert('delete', 'Rejected').then(value => {
        if (value) {
          this.service.providerVehiclDocEdit(data).subscribe((res) => {
            if (res['error']) {
              environment.swalalert('nodata', res['msg']);
              this.appspinner.spinnerAlert('hide');
            } else {
              if (res.body['error'] === false) {
                this.docresult[i] = {
                  Id: r.Id,
                  File: r.File,
                  Name: r.Name,
                  Status: status
                };
                this.getprovidervehicledocuments(this.paramsid);
              } else {
                environment.swalalert('error', res.body['msg']);
              }
            }
          },
            (err) => {
              console.log(err);
            })
        }
      });

    } else {
      this.service.providerVehiclDocEdit(data).subscribe((res) => {
        if (res['error']) {
          environment.swalalert('nodata', res['msg']);
          this.appspinner.spinnerAlert('hide');
        } else {
          if (res.body['error'] === false) {
            environment.swalalert('success', 'Approved Successfully').then(value => {
              if (value) {
                this.docresult[i] = {
                  Id: r.Id,
                  File: r.File,
                  Name: r.Name,
                  Status: status
                };

              }
            });
          } else {
            environment.swalalert('error', res.body['msg']);
          }
        }
      },
        (err) => {
          console.log(err);
        })
    }
  } 

openVehicleForm(){
  this.newVehicle= new  ProviderVehicle();
  this.newVehicle.Id=this.paramsid;
$("#addVehicle").modal('toggle');
}

  getprovidervehicledetails(data, index) {
    this.Vr = data;
    this.Vi = index;
    this.VId = data.Id;
    this.RideVehicleTypeName = data.RideVehicleTpeName;
    this.VVehicleBrandName = data.VehicleBrandName;
    this.VVehicleModelName = data.VehicleModelName;
    this.VVehicleImage = data.VehicleImage;
    this.VVehicleNumber = data.VehicleNumber;
    this.VStatus = data.Status;
    this.VColor = data.Color;    
  }


  deleteSelfie(){
    debugger;
    environment.swalalert('delete', 'Delete').then(value => {
      debugger;
      if (value) {
       
    this.appspinner.spinnerAlert('show');
    this.service.deleteSelfieService(this.paramsid).subscribe((res) => {
      
      this.getProfileView(this.paramsid);   
      debugger;    
      this.pImage='assets/img/user.png';
        this.appspinner.spinnerAlert('hide');
      
    },
      (err) => {
        console.log(err);
      })
      }
    }); 
    // this.pImage='assets/img/user.png';
  }

  // cancellationpolicyedit() {
  //   var Id = this.route.snapshot.params.id;
  //   if (this.cancelEditForm.valid) {
  //     this.editcancel = new CancellationPolicyEditModel(
  //       Id,
  //       this.cancelEditForm.value.UserType,
  //       this.cancelEditForm.value.Description,
  //     );
  //     this.service.cancellationpolicyEdit(this.editcancel).subscribe(res => {
  //       if (res['error']) {
  //         environment.swalalert('nodata', res['msg']);
  //         this.appspinner.spinnerAlert('hide');
  //       } else {
  //         if (res.body['error'] === false) {
  //           environment.swalalert('success', res.body['msg']).then(value => {
  //             if (value) {
  //               this.cancelEditForm.reset();
  //               this.router.navigate(['cancellationPolicyView']);
  //             }
  //           });
  //         } else {
  //           environment.swalalert('error', res.body['msg']);
  //         }
  //       }
  //     });
  //   }
  //   else {
  //     environment.swalalert('warning', 'Validation Required');
  //   }
  // }
}


