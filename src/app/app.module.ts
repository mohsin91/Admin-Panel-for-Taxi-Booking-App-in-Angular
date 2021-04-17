import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbModule, NgbPaginationModule, NgbAlertModule, NgbDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { ScrollEventModule } from 'ngx-scroll-event';
import { CKEditorModule } from 'ngx-ckeditor';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays"
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmDirectionModule } from 'agm-direction'
import { environment } from '../app/config/config';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ControlMessagesComponent } from './login/control-messages.component'
import { EncryService } from './encry.service';
import { from } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './layout/user-list/user-list.component';
import { ProviderListComponent } from './layout/provider-list/provider-list.component';
import { CountryaddComponent } from './layout/countryadd/countryadd.component';
import { CountryeditComponent } from './layout/countryedit/countryedit.component';
import { CountryviewComponent } from './layout/countryview/countryview.component';
import { StateaddComponent } from './layout/stateadd/stateadd.component';
import { StateviewComponent } from './layout/stateview/stateview.component';
import { StateeditComponent } from './layout/stateedit/stateedit.component';
import { CityaddComponent } from './layout/cityadd/cityadd.component';
import { CityviewComponent } from './layout/cityview/cityview.component';
import { CityeditComponent } from './layout/cityedit/cityedit.component';
import { UserListService } from './layout/user-list/user-list.service';
import { CountryaddService } from './layout/countryadd/countryadd.service';
import { StateaddService } from './layout/stateadd/stateadd.service';
import { DoctypeaddComponent } from './layout/doctypeadd/doctypeadd.component';
import { DoctypeviewComponent } from './layout/doctypeview/doctypeview.component';
import { DoctypeeditComponent } from './layout/doctypeedit/doctypeedit.component';
import { RidetypeviewComponent } from './layout/ridetypeview/ridetypeview.component';
import { RidetypeeditComponent } from './layout/ridetypeedit/ridetypeedit.component';
import { RidetypevehicleaddComponent } from './layout/ridetypevehicleadd/ridetypevehicleadd.component';
import { AppconfigComponent } from './layout/appconfig/appconfig.component';
import { AppconfigviewComponent } from './layout/appconfigview/appconfigview.component';
import { RidetypevehicleviewComponent } from './layout/ridetypevehicleview/ridetypevehicleview.component';
import { RidetypevehicleeditComponent } from './layout/ridetypevehicleedit/ridetypevehicleedit.component';
import { VehiclebrandaddComponent } from './layout/vehiclebrandadd/vehiclebrandadd.component';
import { VehiclebrandviewComponent } from './layout/vehiclebrandview/vehiclebrandview.component';
import { VehiclebrandeditComponent } from './layout/vehiclebrandedit/vehiclebrandedit.component';
import { VehiclemodeladdComponent } from './layout/vehiclemodeladd/vehiclemodeladd.component';
import { VehiclemodelviewComponent } from './layout/vehiclemodelview/vehiclemodelview.component';
import { VehiclemodeleditComponent } from './layout/vehiclemodeledit/vehiclemodeledit.component';
import { CancellationpolicyaddComponent } from './layout/cancellationpolicyadd/cancellationpolicyadd.component';
import { CancellationpolicyviewComponent } from './layout/cancellationpolicyview/cancellationpolicyview.component';
import { CancellationpolicyeditComponent } from './layout/cancellationpolicyedit/cancellationpolicyedit.component';
import { StaticpagesaddComponent } from './layout/staticpagesadd/staticpagesadd.component';
import { StaticpagesviewComponent } from './layout/staticpagesview/staticpagesview.component';
import { StaticpageseditComponent } from './layout/staticpagesedit/staticpagesedit.component';
import { EmailtemplateaddComponent } from './layout/emailtemplateadd/emailtemplateadd.component';
import { EmailtemplateviewComponent } from './layout/emailtemplateview/emailtemplateview.component';
import { EmailtemplateeditComponent } from './layout/emailtemplateedit/emailtemplateedit.component';
import { GodsviewComponent } from './layout/godsview/godsview.component';
import { ManualbookComponent } from './layout/manualbook/manualbook.component';
import { AppsliderComponent } from './layout/appslider/appslider.component';
import { AppslidereditComponent } from './layout/appslideredit/appslideredit.component';
import { AppsliderviewComponent } from './layout/appsliderview/appsliderview.component';
import { ProviderListviewComponent } from './layout/provider-listview/provider-listview.component';
import { PushnotificationComponent } from './layout/pushnotification/pushnotification.component';
import { BookingsComponent } from './layout/bookings/bookings.component';
import { BookingsviewComponent } from './layout/bookingsview/bookingsview.component';
import { ProvidervehicleviewComponent } from './layout/providervehicleview/providervehicleview.component';
import { BillingpanelComponent } from './layout/billingpanel/billingpanel.component';
import { CompanyprofileComponent } from './layout/companyprofile/companyprofile.component';
import { RentaloutsationComponent } from './layout/rentaloutsation/rentaloutsation.component';
import { RidelaterbookingComponent } from './layout/ridelaterbooking/ridelaterbooking.component';
import { BookingheatmapComponent } from './layout/bookingheatmap/bookingheatmap.component';
import { ReviewmanagementComponent } from './layout/reviewmanagement/reviewmanagement.component';
import { BanneradsComponent } from './layout/bannerads/bannerads.component';
import { ProvidercancellationComponent } from './layout/providercancellation/providercancellation.component';
import { ServicelocationComponent } from './layout/servicelocation/servicelocation.component';
import { EdithomepageComponent } from './layout/edithomepage/edithomepage.component';
import { LatestnewsupdateComponent } from './layout/latestnewsupdate/latestnewsupdate.component';
import { NewslettersubsComponent } from './layout/newslettersubs/newslettersubs.component';
import { FaqsComponent } from './layout/faqs/faqs.component';
import { DbbackupComponent } from './layout/dbbackup/dbbackup.component';
import { SystemdiaComponent } from './layout/systemdia/systemdia.component';
import { LocationbasedComponent } from './layout/locationbased/locationbased.component';
import { SurgepricemanageComponent } from './layout/surgepricemanage/surgepricemanage.component';
import { PromocodeComponent } from './layout/promocode/promocode.component';
import { PromocodeAddComponent } from './layout/promocode-add/promocode-add.component';
import { PromocodeEditComponent } from './layout/promocode-edit/promocode-edit.component';
import { BanneradseditComponent } from './layout/banneradsedit/banneradsedit.component';
import { BanneradsaddComponent } from './layout/banneradsadd/banneradsadd.component';
import { PeekchargesComponent } from './layout/peekcharges/peekcharges.component';
import { PeekchargesaddComponent } from './layout/peekchargesadd/peekchargesadd.component';
import { PeekchargeseditComponent } from './layout/peekchargesedit/peekchargesedit.component';
import { WithdrawlrequestComponent } from './layout/withdrawlrequest/withdrawlrequest.component';
import { ReportsComponent } from './layout/reports/reports.component';
import { UserDetailComponent } from './layout/user-detail/user-detail.component';
import { TypeOfPipe } from './shared/pipes/typeof.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LayoutComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ControlMessagesComponent,
    RegisterComponent,
    UserListComponent,
    ProviderListComponent,
    CountryaddComponent,
    CountryeditComponent,
    CountryviewComponent,
    StateaddComponent,
    StateviewComponent,
    StateeditComponent,
    CityaddComponent,
    CityviewComponent,
    CityeditComponent,
    DoctypeaddComponent,
    DoctypeviewComponent,
    DoctypeeditComponent,
    RidetypevehicleaddComponent,
    RidetypevehicleviewComponent,
    RidetypevehicleeditComponent,
    RidetypeviewComponent,
    RidetypeeditComponent,
    AppconfigComponent,
    AppconfigviewComponent,
    VehiclebrandaddComponent,
    VehiclebrandviewComponent,
    VehiclebrandeditComponent,
    VehiclemodeladdComponent,
    VehiclemodelviewComponent,
    VehiclemodeleditComponent,
    CancellationpolicyaddComponent,
    CancellationpolicyviewComponent,
    CancellationpolicyeditComponent,
    StaticpagesaddComponent,
    StaticpagesviewComponent,
    StaticpageseditComponent,
    EmailtemplateaddComponent,
    EmailtemplateviewComponent,
    EmailtemplateeditComponent,
    GodsviewComponent,
    ManualbookComponent,
    AppsliderComponent,
    AppslidereditComponent,
    AppsliderviewComponent,
    ProviderListviewComponent,
    PushnotificationComponent,
    BookingsComponent,
    BookingsviewComponent,
    ProvidervehicleviewComponent,
    BillingpanelComponent,
    CompanyprofileComponent,
    RentaloutsationComponent,
    RidelaterbookingComponent,
    BookingheatmapComponent,
    ReviewmanagementComponent,
    BanneradsComponent,
    ProvidercancellationComponent,
    ServicelocationComponent,
    EdithomepageComponent,
    LatestnewsupdateComponent,
    NewslettersubsComponent,
    FaqsComponent,
    DbbackupComponent,
    SystemdiaComponent,
    LocationbasedComponent,
    SurgepricemanageComponent,
    PromocodeComponent,
    PromocodeAddComponent,
    PromocodeEditComponent,
    BanneradsaddComponent,
    BanneradseditComponent,
    PeekchargesComponent,
    PeekchargesaddComponent,
    PeekchargeseditComponent,
    WithdrawlrequestComponent,
    ReportsComponent,
    UserDetailComponent,

    TypeOfPipe
  ],
  imports: [
    NgbPaginationModule,    
    NgbModule,
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ScrollEventModule,
    CKEditorModule,
    DatePickerModule,
    AgmOverlays,
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      language: 'en',
      libraries: ['geometry', 'places']
    }),
    AgmDirectionModule
  ],
  providers: [
    EncryService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
