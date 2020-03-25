import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
