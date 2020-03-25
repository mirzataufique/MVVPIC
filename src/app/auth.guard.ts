import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private routes: Router){}

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean{
    console.log("AUTH gaurd called====>");
      if(localStorage.getItem('username')!= null){
        console.log("auuthgaurd works");
      return true;
    }
    else{
      console.log("auuthgaurd not works navigated to login Page---->");
      this.routes.navigate(['/login']);
      return false;
    }
  }
  
}
