import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service'
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { StudentListService } from 'src/app/Services/student-list.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public AllData = [];

  constructor(private _studentService: StudentListService, private authService: AuthService,private socialService: SocialAuthService) { }

  user: SocialUser;
  loggedIn: boolean;


  public uname;
  public pass;
  public cnfpass;

  ngOnInit() {
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    // // this._studentService.getStudents().subscribe((data) => {
    // //   // console.log("my data-- ", JSON.stringify(data))
    // //   this.AllData = data;
    // })

    // console.log("====>", this.AllData);
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });

  }
  /**
   * signUpdeatl=[{}] */


  // public signUpdeatails=[{
  //   "user" :this.uname,
  //   "pass" :this.pass,
  //   "cnfpass": this.cnfpass
  // }] 
    
 

  signOut(): void {
    console.log("insde signout method---")
    this.authService.signOut();
  }

}
