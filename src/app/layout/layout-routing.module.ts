import { NgModule } from '@angular/core';
import { Routes, RouterModule,Route,Router,CanActivate,CanActivateChild,CanLoad,CanDeactivate,Navigation,ActivatedRouteSnapshot,ActivatedRoute,RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { from } from 'rxjs';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
            {path:'',redirectTo:'dashboard'},
            {path:'dashboard',loadChildren: './dashboard/dashboard.component#DashboardComponent'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
