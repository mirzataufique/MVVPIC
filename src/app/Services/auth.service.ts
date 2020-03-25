import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseurl = 'http://localhost:3000/';

    //route auth checking======================>
  checkUserCredential(uname: string, pass: string){
    console.log("route in service",uname,pass);
    if(uname == "admin" && pass == "admin")
    {
      localStorage.setItem('username',uname);
      console.log("localStorage data---->",localStorage)
      return true;
    }
    else{
      return false;
    }
  }
  // login details=====================>
  getLoginDetails(uname: string,pass: string){
    console.log("Login details called in service--");
    console.log("username",uname);
    console.log("Password",pass); 
     console.log("baseurl",this.baseurl)
    return this.http.get(this.baseurl+"login/"+uname+"/"+pass+"").pipe(map(res =>res));
    
    }

    
    



  
}
