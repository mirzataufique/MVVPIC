import { Component } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MVVPIC';
constructor(public routes: Router){

}
// public msgClass ={
// "text-success":this.isSuccess,
// "text-danger":this.isDanger,
// "text-uppercase":this.isUpperCase,
// "text-lowercase":this.isLowerCase
// }


}
