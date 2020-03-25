import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomepageComponent } from './views/homepage/homepage.component';
import { AddmissionComponent } from './views/addmission/addmission.component';
import { StdreportComponent } from './views/stdreport/stdreport.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';


const routes: Routes = [
  // {path: '**',component: PageNotFoundComponent},google
  {path:'login',component:LoginComponent},
  {path:'home',canActivate :[AuthGuard],component:HomepageComponent},
  {path:'addmission',component:AddmissionComponent},
  {path:'report',component:StdreportComponent},
  {path:'',redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent =[HomepageComponent,AddmissionComponent,StdreportComponent,LoginComponent];