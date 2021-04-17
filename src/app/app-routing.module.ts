import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuardGuard } from './guard.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './layout/user-list/user-list.component';
import { ProviderListComponent } from './layout/provider-list/provider-list.component';
import { CountryaddComponent } from './layout/countryadd/countryadd.component';
import { CountryviewComponent } from './layout/countryview/countryview.component';
import { CountryeditComponent } from './layout/countryedit/countryedit.component';
import { StateaddComponent } from './layout/stateadd/stateadd.component';
import { StateviewComponent } from './layout/stateview/stateview.component';
import { StateeditComponent } from './layout/stateedit/stateedit.component';
import { CityaddComponent } from './layout/cityadd/cityadd.component';
import { CityviewComponent } from './layout/cityview/cityview.component';
import { CityeditComponent } from './layout/cityedit/cityedit.component';
import { DoctypeaddComponent } from './layout/doctypeadd/doctypeadd.component';
import { DoctypeviewComponent } from './layout/doctypeview/doctypeview.component';
import { DoctypeeditComponent } from './layout/doctypeedit/doctypeedit.component';
import { RidetypeviewComponent } from './layout/ridetypeview/ridetypeview.component';
import { RidetypeeditComponent } from './layout/ridetypeedit/ridetypeedit.component';
import { RidetypevehicleaddComponent } from './layout/ridetypevehicleadd/ridetypevehicleadd.component';
import { AppconfigComponent } from './layout/appconfig/appconfig.component';
import { AppconfigviewComponent } from './layout/appconfigview/appconfigview.component';
import { RidetypevehicleviewComponent } from './layout/ridetypevehicleview/ridetypevehicleview.component';
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
import { AppsliderviewComponent } from './layout/appsliderview/appsliderview.component';
import { AppslidereditComponent } from './layout/appslideredit/appslideredit.component';
import { ProviderListviewComponent } from './layout/provider-listview/provider-listview.component';
import { RidetypevehicleeditComponent } from './layout/ridetypevehicleedit/ridetypevehicleedit.component';
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
import { BanneradsaddComponent } from './layout/banneradsadd/banneradsadd.component';
import { BanneradseditComponent } from './layout/banneradsedit/banneradsedit.component';
import { PeekchargesComponent } from './layout/peekcharges/peekcharges.component';
import { PeekchargesaddComponent } from './layout/peekchargesadd/peekchargesadd.component';
import { PeekchargeseditComponent } from './layout/peekchargesedit/peekchargesedit.component';
import { WithdrawlrequestComponent } from './layout/withdrawlrequest/withdrawlrequest.component';
import { ReportsComponent } from './layout/reports/reports.component';
import { UserDetailComponent } from './layout/user-detail/user-detail.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard] },
      { path: 'Users', component: UserListComponent, canActivate: [GuardGuard] },
      { path: 'Users/:page', component: UserListComponent, canActivate: [GuardGuard] },
      { path: 'User/:id', component: UserDetailComponent, canActivate: [GuardGuard] },
      { path: 'Providers', component: ProviderListComponent, canActivate: [GuardGuard] },
      { path: 'countryAdd', component: CountryaddComponent, canActivate: [GuardGuard] },
      { path: 'countryView', component: CountryviewComponent, canActivate: [GuardGuard] },
      { path: 'countryEdit/:id', component: CountryeditComponent, canActivate: [GuardGuard] },
      { path: 'stateAdd', component: StateaddComponent, canActivate: [GuardGuard] },
      { path: 'stateView', component: StateviewComponent, canActivate: [GuardGuard] },
      { path: 'stateEdit/:id', component: StateeditComponent, canActivate: [GuardGuard] },
      { path: 'cityAdd', component: CityaddComponent, canActivate: [GuardGuard] },
      { path: 'godsView', component: GodsviewComponent, canActivate: [GuardGuard] },
      { path: 'bookings', component: BookingsComponent, canActivate: [GuardGuard] },
      { path: 'bookingsView/:id', component: BookingsviewComponent, canActivate: [GuardGuard] },
      { path: 'pushNotificationView', component: PushnotificationComponent, canActivate: [GuardGuard] },
      { path: 'manualBook', component: ManualbookComponent, canActivate: [GuardGuard] },
      { path: 'cityView', component: CityviewComponent, canActivate: [GuardGuard] },
      { path: 'cityEdit/:id', component: CityeditComponent, canActivate: [GuardGuard] },
      { path: 'doctypeAdd', component: DoctypeaddComponent, canActivate: [GuardGuard] },
      { path: 'doctypeView', component: DoctypeviewComponent, canActivate: [GuardGuard] },
      { path: 'doctypeEdit/:id', component: DoctypeeditComponent, canActivate: [GuardGuard] },
      { path: 'ridetypeView', component: RidetypeviewComponent, canActivate: [GuardGuard] },
      { path: 'ridetypeEdit/:id', component: RidetypeeditComponent, canActivate: [GuardGuard] },
      { path: 'rideVehicletypeAdd', component: RidetypevehicleaddComponent, canActivate: [GuardGuard] },
      { path: 'rideVehicletypeView', component: RidetypevehicleviewComponent, canActivate: [GuardGuard] },
      { path: 'rideVehicletypeEdit/:id', component: RidetypevehicleeditComponent, canActivate: [GuardGuard] },
      { path: 'appConfig', component: AppconfigComponent, canActivate: [GuardGuard] },
      { path: 'appConfigView', component: AppconfigviewComponent, canActivate: [GuardGuard] },
      { path: 'appConfig/:id', component: AppconfigComponent, canActivate: [GuardGuard] },
      { path: 'vehicleBrandAdd', component: VehiclebrandaddComponent, canActivate: [GuardGuard] },
      { path: 'vehicleBrandView', component: VehiclebrandviewComponent, canActivate: [GuardGuard] },
      { path: 'vehicleBrandEdit/:id', component: VehiclebrandeditComponent, canActivate: [GuardGuard] },
      { path: 'vehicleModelAdd', component: VehiclemodeladdComponent, canActivate: [GuardGuard] },
      { path: 'vehicleModelView', component: VehiclemodelviewComponent, canActivate: [GuardGuard] },
      { path: 'vehicleModelEdit/:id', component: VehiclemodeleditComponent, canActivate: [GuardGuard] },
      { path: 'cancellationPolicyAdd', component: CancellationpolicyaddComponent, canActivate: [GuardGuard] },
      { path: 'cancellationPolicyView', component: CancellationpolicyviewComponent, canActivate: [GuardGuard] },
      { path: 'cancellationPolicyEdit/:id', component: CancellationpolicyeditComponent, canActivate: [GuardGuard] },
      { path: 'staticPagesAdd', component: StaticpagesaddComponent, canActivate: [GuardGuard] },
      { path: 'staticPagesView', component: StaticpagesviewComponent, canActivate: [GuardGuard] },
      { path: 'staticPagesEdit/:id', component: StaticpageseditComponent, canActivate: [GuardGuard] },
      { path: 'emailTemplateAdd', component: EmailtemplateaddComponent, canActivate: [GuardGuard] },
      { path: 'emailTemplateView', component: EmailtemplateviewComponent, canActivate: [GuardGuard] },
      { path: 'emailTemplateEdit/:id', component: EmailtemplateeditComponent, canActivate: [GuardGuard] },
      { path: 'appSliderAdd', component: AppsliderComponent, canActivate: [GuardGuard] },
      { path: 'appSliderView', component: AppsliderviewComponent, canActivate: [GuardGuard] },
      { path: 'appSliderEdit/:id', component: AppslidereditComponent, canActivate: [GuardGuard] },
      { path: 'providerVehicleView/:id', component: ProvidervehicleviewComponent, canActivate: [GuardGuard] },
      { path: 'providerListView/:id', component: ProviderListviewComponent, canActivate: [GuardGuard] },
      { path: 'billing', component: BillingpanelComponent, canActivate: [GuardGuard] },
      { path: 'companyprofile', component: CompanyprofileComponent, canActivate: [GuardGuard] },
      { path: 'rental', component: RentaloutsationComponent, canActivate: [GuardGuard] },
      { path: 'ridelaterbook', component: RidelaterbookingComponent, canActivate: [GuardGuard] },
      { path: 'bookingheatmap', component: BookingheatmapComponent, canActivate: [GuardGuard] },
      { path: 'reviewmanagement', component: ReviewmanagementComponent, canActivate: [GuardGuard] },
      { path: 'bannerads', component: BanneradsComponent, canActivate: [GuardGuard] },
      { path: 'banneradsAdd', component: BanneradsaddComponent, canActivate: [GuardGuard] },
      { path: 'banneradsEdit/:id', component: BanneradseditComponent, canActivate: [GuardGuard] },
      { path: 'providercancellation', component: ProvidercancellationComponent, canActivate: [GuardGuard] },
      { path: 'servicelocation', component: ServicelocationComponent, canActivate: [GuardGuard] },
      { path: 'edithomepage', component: EdithomepageComponent, canActivate: [GuardGuard] },
      { path: 'latestnewsupdate', component: LatestnewsupdateComponent, canActivate: [GuardGuard] },
      { path: 'newslettersubs', component: NewslettersubsComponent, canActivate: [GuardGuard] },
      { path: 'faqs', component: FaqsComponent, canActivate: [GuardGuard] },
      { path: 'dbbackup', component: DbbackupComponent, canActivate: [GuardGuard] },
      { path: 'systemdia', component: SystemdiaComponent, canActivate: [GuardGuard] },
      { path: 'locationbased', component: LocationbasedComponent, canActivate: [GuardGuard] },
      { path: 'surgepricemanage', component: SurgepricemanageComponent, canActivate: [GuardGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [GuardGuard] },
      { path: 'promoCodes', component: PromocodeComponent, canActivate: [GuardGuard] },
      { path: 'promoCodesAdd', component: PromocodeAddComponent, canActivate: [GuardGuard] },
      { path: 'promoCodesEdit/:id', component: PromocodeEditComponent, canActivate: [GuardGuard] },
      { path: 'peekCharges', component: PeekchargesComponent, canActivate: [GuardGuard] },
      { path: 'peekChargesAdd', component: PeekchargesaddComponent, canActivate: [GuardGuard] },
      { path: 'peekChargesEdit/:id', component: PeekchargeseditComponent, canActivate: [GuardGuard] },
      { path: 'withDrawlRequest', component: WithdrawlrequestComponent, canActivate: [GuardGuard] }

    ], canActivate: [GuardGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
