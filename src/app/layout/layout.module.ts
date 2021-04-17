import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DoctypeaddComponent } from './doctypeadd/doctypeadd.component';
import { DoctypeviewComponent } from './doctypeview/doctypeview.component';
import { DoctypeeditComponent } from './doctypeedit/doctypeedit.component';
import { RidetypeviewComponent } from './ridetypeview/ridetypeview.component';
import { RidetypeeditComponent } from './ridetypeedit/ridetypeedit.component';
import { RidetypevehicleaddComponent } from './ridetypevehicleadd/ridetypevehicleadd.component';
import { RidetypevehicleviewComponent } from './ridetypevehicleview/ridetypevehicleview.component';
import { RidetypevehicleeditComponent } from './ridetypevehicleedit/ridetypevehicleedit.component';
import { AppconfigComponent } from './appconfig/appconfig.component';
import { AppconfigviewComponent } from './appconfigview/appconfigview.component';
import { VehiclebrandaddComponent } from './vehiclebrandadd/vehiclebrandadd.component';
import { VehiclebrandviewComponent } from './vehiclebrandview/vehiclebrandview.component';
import { VehiclebrandeditComponent } from './vehiclebrandedit/vehiclebrandedit.component';
import { VehiclemodeladdComponent } from './vehiclemodeladd/vehiclemodeladd.component';
import { VehiclemodelviewComponent } from './vehiclemodelview/vehiclemodelview.component';
import { VehiclemodeleditComponent } from './vehiclemodeledit/vehiclemodeledit.component';
import { CancellationpolicyaddComponent } from './cancellationpolicyadd/cancellationpolicyadd.component';
import { CancellationpolicyviewComponent } from './cancellationpolicyview/cancellationpolicyview.component';
import { CancellationpolicyeditComponent } from './cancellationpolicyedit/cancellationpolicyedit.component';
import { StaticpagesaddComponent } from './staticpagesadd/staticpagesadd.component';
import { StaticpagesviewComponent } from './staticpagesview/staticpagesview.component';
import { StaticpageseditComponent } from './staticpagesedit/staticpagesedit.component';
import { EmailtemplateaddComponent } from './emailtemplateadd/emailtemplateadd.component';
import { EmailtemplateviewComponent } from './emailtemplateview/emailtemplateview.component';
import { EmailtemplateeditComponent } from './emailtemplateedit/emailtemplateedit.component';
import { GodsviewComponent } from './godsview/godsview.component';
import { ManualbookComponent } from './manualbook/manualbook.component';
import { AppsliderComponent } from './appslider/appslider.component';
import { AppsliderviewComponent } from './appsliderview/appsliderview.component';
import { AppslidereditComponent } from './appslideredit/appslideredit.component';
import { ProviderListviewComponent } from './provider-listview/provider-listview.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsviewComponent } from './bookingsview/bookingsview.component';
import { ProvidervehicleviewComponent } from './providervehicleview/providervehicleview.component';
import { BillingpanelComponent } from './billingpanel/billingpanel.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { RentaloutsationComponent } from './rentaloutsation/rentaloutsation.component';
import { RidelaterbookingComponent } from './ridelaterbooking/ridelaterbooking.component';
import { BookingheatmapComponent } from './bookingheatmap/bookingheatmap.component';
import { ReviewmanagementComponent } from './reviewmanagement/reviewmanagement.component';
import { BanneradsComponent } from './bannerads/bannerads.component';
import { ProvidercancellationComponent } from './providercancellation/providercancellation.component';
import { ServicelocationComponent } from './servicelocation/servicelocation.component';
import { EdithomepageComponent } from './edithomepage/edithomepage.component';
import { LatestnewsupdateComponent } from './latestnewsupdate/latestnewsupdate.component';
import { NewslettersubsComponent } from './newslettersubs/newslettersubs.component';
import { FaqsComponent } from './faqs/faqs.component';
import { DbbackupComponent } from './dbbackup/dbbackup.component';
import { SystemdiaComponent } from './systemdia/systemdia.component';
import { LocationbasedComponent } from './locationbased/locationbased.component';
import { SurgepricemanageComponent } from './surgepricemanage/surgepricemanage.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { PromocodeAddComponent } from './promocode-add/promocode-add.component';
import { PromocodeEditComponent } from './promocode-edit/promocode-edit.component';
import { BanneradsaddComponent } from './banneradsadd/banneradsadd.component';
import { BanneradseditComponent } from './banneradsedit/banneradsedit.component';
import { WithdrawlrequestComponent } from './withdrawlrequest/withdrawlrequest.component';
import { ReportsComponent } from './reports/reports.component';

// import { LayoutComponent } from './layout.component'
// import { LayoutRoutingModule } from './layout-routing.module';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { from } from 'rxjs';
// import { UserListComponent } from './user-list/user-list.component';
// import { ProviderListComponent } from './provider-list/provider-list.component';
// import { CountryaddComponent } from './countryadd/countryadd.component';
// import { CountryviewComponent } from './countryview/countryview.component';
// import { CountryeditComponent } from './countryedit/countryedit.component';
// import { StateaddComponent } from './stateadd/stateadd.component';
// import { StateviewComponent } from './stateview/stateview.component';
// import { StateeditComponent } from './stateedit/stateedit.component';
// import { CityaddComponent } from './cityadd/cityadd.component';
// import { CityviewComponent } from './cityview/cityview.component';
// import { CityeditComponent } from './cityedit/cityedit.component';

@NgModule({
  declarations: [
    // LayoutComponent,
    // SidebarComponent,
    // NavbarComponent,
    // DashboardComponent,
    // UserListComponent,
    // ProviderListComponent,
    // CountryaddComponent,
    // CountryviewComponent,
    // CountryeditComponent,
    // StateaddComponent,
    // StateviewComponent,
    // StateeditComponent,
    // CityaddComponent,
    // CityviewComponent,
    // CityeditComponent
    // DoctypeaddComponent,
    // DoctypeviewComponent,
    // DoctypeeditComponent,
    // RidetypevehicleaddComponent,
    // RidetypeviewComponent,
    // RidetypeeditComponent,
    // RidetypevehicleaddComponent,
    // RidetypevehicleviewComponent,
    // RidetypevehicleeditComponent,
    // AppconfigComponent,
    // AppconfigviewComponent
  // VehiclebrandaddComponent,
  //   VehiclebrandviewComponent,
  //   VehiclebrandeditComponent,
  //   VehiclemodeladdComponent,
  //   VehiclemodelviewComponent,
  //   VehiclemodeleditComponent
  // CancellationpolicyaddComponent,
  //   CancellationpolicyviewComponent,
  //   CancellationpolicyeditComponent
  // CancellationpolicyaddComponent,
  //   CancellationpolicyviewComponent,
  //   CancellationpolicyeditComponent,
  //   StaticpagesaddComponent,
  //   StaticpagesviewComponent,
  //   StaticpageseditComponent
  // EmailtemplateaddComponent,
  //   EmailtemplateviewComponent,
  //   EmailtemplateeditComponent
  // GodsviewComponent
  // ManualbookComponent
  // AppsliderComponent
  // AppsliderviewComponent,
    // AppslidereditComponent],
  // ProviderListviewComponent
// PushnotificationComponent
// BookingsComponent
// BookingsviewComponent
// ProvidervehicleviewComponent
// BillingpanelComponent,
//     CompanyprofileComponent,
//     RentaloutsationComponent,
//     RidelaterbookingComponent,
//     BookingheatmapComponent,
//     ReviewmanagementComponent,
//     BanneradsComponent,
//     ProvidercancellationComponent,
//     ServicelocationComponent,
//     EdithomepageComponent,
//     LatestnewsupdateComponent,
//     NewslettersubsComponent,
//     FaqsComponent,
//     DbbackupComponent,
//     SystemdiaComponent,
//     LocationbasedComponent,
//     SurgepricemanageComponent
  // PromocodeComponent
// PromocodeAddComponent,
    // PromocodeEditComponent
  // BanneradsaddComponent,
  //   BanneradseditComponent
  // WithdrawlrequestComponent
// ReportsComponent
],
  imports: [
    CommonModule,
    BrowserModule
    // LayoutRoutingModule
  ]
})
export class LayoutModule { }
