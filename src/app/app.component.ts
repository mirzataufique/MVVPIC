import { Component } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MVVPIC';

public isSuccess="text-success";
public isDanger = "text-danger";
public isUpperCase ="text-uppercase";
public isLowerCase = "text-lowercase";
public isSpecial ="text-italic";


public msgClass ={
"text-success":this.isSuccess,
// "text-danger":this.isDanger,
"text-uppercase":this.isUpperCase,
// "text-lowercase":this.isLowerCase
}

}
