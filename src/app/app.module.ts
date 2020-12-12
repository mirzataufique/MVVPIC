import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WavesModule } from 'ng-uikit-pro-standard'
import { ButtonsModule } from 'ng-uikit-pro-standard';
import { IconsModule } from 'ng-uikit-pro-standard';
import { LightBoxModule } from 'ng-uikit-pro-standard';
import { CarouselModule } from 'ng-uikit-pro-standard';
import { ModalModule } from 'ng-uikit-pro-standard';





// const google_aouth_client_id: string = "1043334809034-h3gck3cp5c2boggj9hg5dhrl172fr5ms.apps.googleusercontent.com";

@NgModule({
  declarations: [
    AppComponent,
    routingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    SocialLoginModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    LightBoxModule,
    CarouselModule,
    ModalModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1043334809034-h3gck3cp5c2boggj9hg5dhrl172fr5ms.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('960288311068672'),
          },
        ], AuthService,
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
