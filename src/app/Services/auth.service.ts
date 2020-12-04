import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError ,retry} from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const baseurl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private http: HttpClient) { }

  //Route Athentication============================>
  users = {
    role: ["ADMIN"]
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.data[0] == this.users.role) {
      return true;
    } else {
      return false;
    }

  }

  // checkUserCredential(uname: string, pass: string){
  //   console.log("route in service",uname,pass);
  //   if(uname == "admin" && pass == "admin")
  //   {
  //     localStorage.setItem('username',uname);
  //     console.log("localStorage data---->",localStorage)
  //     return true;
  //   }
  //   else{
  //     return false;
  //   } 
  // }
  // login details=====================>
  // getLoginDetails(username: string,pass: string ){
  //   console.log("Login details called in service--");
  //   return this.http.get(this.baseurl+"login/"+username+"/"+pass+"").pipe(map(res =>res));

  //   }
  login(data): Observable<any> {
    console.log("stdData- in service--->", data)
    return this.http.post(baseurl + 'user/login', data, httpOptions)
      .pipe(retry(1),map((data: any) => {
        return data;
      }),
        catchError(error => {
          return throwError(error);
        })
      )

  }



  signOut(): void {
    this.signOut();
  }

}
