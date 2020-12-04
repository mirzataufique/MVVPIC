import { Component, OnInit ,HostListener} from '@angular/core';
import {AuthService} from '../../Services/auth.service'
import { SocialAuthService,SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public AllData = [];

  constructor(private authService: AuthService,private socialService: SocialAuthService) { 
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  user: SocialUser;
  loggedIn: boolean;

  ngOnInit() {
  }
 
 isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  signOut(): void {
    this.authService.signOut();
  }


}
