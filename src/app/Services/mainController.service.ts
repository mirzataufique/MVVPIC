import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainControllerService {

  constructor(private http: HttpClient,private logService: AuthService, private routes: Router) { }
  baseurl = 'http://localhost:3000/';
  
 msg;
  loginStudent(uname: string, pass: string,){
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
  getStudents() {
    console.log("inside service====",)
    return this.http.get(this.baseurl+"stdReport/").pipe(map(res => res))
    
  } 
  getQuizData(){
    console.log("quiz inside main service===>");
    return this.http.get(this.baseurl+"quiz/").pipe(map(res => res))
  }
  getStudentsByid(std_id) {
    console.log("helloooo",std_id)
    return this.http.get(this.baseurl+"stdReport/:"+"'std_id'").pipe(map(res => res))
    
  }
  post(stdData){
    console.log("stdData- in service--->",stdData)
    // return this.http.post(this.baseurl+"register/",JSON.stringify(sdtData),).pipe(map(res=>res))
    return this.http.post(this.baseurl+"nn",JSON.stringify(stdData)).pipe(map(res=>res))
  }
  
}
