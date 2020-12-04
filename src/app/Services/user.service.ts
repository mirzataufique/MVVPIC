import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';



const baseurl = 'http://localhost:3000/';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  
  getTest(): Observable<any> {
    console.log("inside service====",)
    return this.http.get(baseurl + "user").pipe(map(res => res))
    
  } 
  signUp(userData): Observable<any>{
       console.log("inside userService-->",userData);
       return this.http.post(baseurl+'user/signup',userData,httpOptions)
       .pipe(map(res=>res));
  }
}
