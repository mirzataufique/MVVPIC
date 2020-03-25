import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private logService: AuthService, private routes: Router) { }
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
  }
 

  loginUser(uname: string, pass: string) {
    console.log("Login button clicked");
    // console.log("username", uname);
    // console.log("Password", pass);
   
    if (uname != null && uname != "" || pass != null && pass != "") {
      console.log("if condition called");
      // cheking route authentication-------------->
      var checkUserData = this.logService.getLoginDetails(uname, pass);
      var checkedRoute = this.logService.checkUserCredential(uname, pass);

      if (checkUserData != null) {
        if (checkedRoute == true) {
          this.logService.getLoginDetails(uname, pass);
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

}
