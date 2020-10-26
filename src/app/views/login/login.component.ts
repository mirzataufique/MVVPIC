import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login"; 
import {MainControllerService} from "../../Services/mainController.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: AuthService, private routes: Router,private socialService: SocialAuthService,private _mainService: MainControllerService) { }
  msg;
  public hasErrorhas = "true";
  // ==================== Use for Rout authentication
  // checkAuth(uname: string, pass: string) {
  //   console.log("username",uname);
  //   console.log("Password",pass);
  //   var output= this.logService.checkUserCredential(uname,pass);
  //   console.log("output from services",output)
  //   if (output === true) {
  //     this.routes.navigate(['./home']);

  //   }else{
  //     this.msg="Invalid credintial";
  //   }
  // }
  ngOnInit() {
    // this.socialService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }
 
public username;
public pass;
  loginUser(uname: string, pass: string) {
    console.log("Login button clicked--------->");
    // this._mainService.loginStudent(uname: string, pass: string);
    console.log("username", uname);
    console.log("Password", pass);
   
    if (uname != null && uname != "" || pass != null && pass != "") {
      console.log("if condition called");
      // cheking route authentication-------------->
      var checkUserData = this.authService.getLoginDetails(uname, pass);
      var checkedRoute = this.authService.checkUserCredential(uname, pass);

      if (checkUserData != null) {
        if (checkedRoute == true) {
          this.authService.getLoginDetails(uname, pass);
          this.routes.navigate(['/home']);
        }
        else {
          
          this.routes.navigate(['/login']);

          this.msg = "Invalid Credential Please Try agian...!";
        }
      }
    }
    else {
      this.msg = "Invalid Credential Please Try agian...!";
    }
  }
  // Social login =========================================>
  signInWithGoogle(): void {
    console.log("sign with google.....")
    if(GoogleLoginProvider.PROVIDER_ID!=null || ''){
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.routes.navigate(['/home']);

    }else{
      this.routes.navigate(['/login']);
    }
  }
  signInWithFB(): void {
    console.log("sign with fb ")
    if(FacebookLoginProvider.PROVIDER_ID != null || ''){
      this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.routes.navigate(['/home']);

    }else{
      this.routes.navigate(['/login']);
    }
  }
 
  // signOut(): void {
  //   this.authService.signOut();
  // }

}
