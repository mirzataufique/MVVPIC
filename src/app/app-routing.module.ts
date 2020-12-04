import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomepageComponent } from './views/homepage/homepage.component';
import { AddmissionComponent } from './views/addmission/addmission.component';
import { StdreportComponent } from './views/stdreport/stdreport.component';
import { AuthService } from './Services/auth.service';
import { LoginComponent } from './views/login/login.component';
import {FacultyComponent} from './views/faculty/faculty.component';
import { FltreportComponent } from './views/fltreport/fltreport.component';
import { FooterComponent } from './views/footer/footer.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';



const routes: Routes = [
  // {path: '**',component: PageNotFoundComponent},google
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: HomepageComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: DashboardComponent
  },
  {
    path: 'footer',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: FooterComponent
  },
  
  {
    path: 'addmission',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: AddmissionComponent
  },
  {
    path: 'report',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: StdreportComponent
  },
  {
    path: 'faculty',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: FacultyComponent
  },
  {
    path: 'fcltreport',
    canActivate: [AuthService],
    data:['ADMIN'],
    component: FltreportComponent
  },

  {
    path: '',
    redirectTo: "/dashboard", 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomepageComponent, AddmissionComponent, StdreportComponent, LoginComponent,FltreportComponent,FooterComponent,PageNotFoundComponent];