import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from '../../Services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
successMsg;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private routes: Router, private activatedRoute: ActivatedRoute, private socialService: SocialAuthService, private userService: UserService) {
    this.loginForm = new FormGroup({
      userType: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, Validators.email),
      userPassword: new FormControl(null, Validators.required)
    })
  }

  // ==================== Use for Rout authentication

  logIn() {
   console.log('loginData--',this.loginForm.value);
   localStorage.removeItem('token');
   if(this.loginForm.valid){
    this.userService.login(this.loginForm.value)
    .subscribe((result) => {
      console.log("token--", result)
      localStorage.setItem('token', result);
      this.routes.navigate(['/home'])
    },
      (error) => {
        console.log('An unexpected error occured', error);
        this.successMsg = error.statusText;
        console.log('response',this.successMsg);
        this.routes.navigate(['/login']);
      }, () => {
        console.log('Authentication completed');
      });
   }
    
  };
  ngOnInit() {
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

 
  }

  // Social login =========================================>
  signInWithGoogle(): void {
    console.log("sign with google.....")
    if (GoogleLoginProvider.PROVIDER_ID != null || '') {
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
        console.log("succesfully", x);
        this.routes.navigate(['/home']);
      })
    } else {
      this.routes.navigate(['/login']);
    }
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  moveToRegiter() {
    this.routes.navigate(['../register'], { relativeTo: this.activatedRoute })
  }
}
