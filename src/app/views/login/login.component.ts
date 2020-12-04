import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: AuthService, private routes: Router, private socialService: SocialAuthService, private userService: UserService) { }
  public msg;
  public UserData
  public hasErrorhas = "true";
  // ==================== Use for Rout authentication
  Alldata: any;
  ngOnInit() {
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    //UserData------------------------------==>
    this.userService.getTest().subscribe((result => {
      this.Alldata = result;
      console.log("inside login compoent", this.Alldata)
    }));
  }
  loginResMsg: any;
  signupResMsg: any;
  logIn(loginData) {
    let data = {
      "userType": loginData.loginType,
      "userEmail": loginData.userName,
      "userPassword": loginData.loginPassword
    }
    // console.log("inside login-->", data,)
    this.authService.login(data).subscribe((result) => {
      this.loginResMsg = result;
      this.routes.navigate(['/dashboard']);
    },
      (error) => {
        console.log('An unexpected error occured', error.statusText);
        this.loginResMsg = error.statusText;
        this.routes.navigate(['/login']);
      }, () => {
        console.log('Authentication completed');
      });
  };


  singUp(usersData) {
    console.log("signup button clicked--------->", usersData);
    this.userService.signUp(usersData).subscribe((result) => {
      this.signupResMsg = result.message;
      this.routes.navigate(['/login']);
      console.log("status", this.signupResMsg)
    },
      (error) => {
        console.log('An unexpected error occured', error.error.message);
        this.signupResMsg = error.error.message;
      }, () => {
        console.log('completed');
      });

  };

  // Social login =========================================>
  signInWithGoogle(): void {
    console.log("sign with google.....")
    if (GoogleLoginProvider.PROVIDER_ID != null || '') {
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
        console.log("succesfully", x);
        this.routes.navigate(['/home']);
      })
    } else {
      this.msg;
      this.routes.navigate(['/login']);
    }
  }
  signInWithFB(): void {
    console.log("sign with fb ")
    if (FacebookLoginProvider.PROVIDER_ID != null || '') {
      this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
        console.log("succesfully", x);
        alert("succesfully Login click ok to navigate the home page")
        this.routes.navigate(['/dashboard']);
      })
    } else {
      this.msg;
      this.routes.navigate(['/login']);
    }

  }
}
