import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const token = localStorage.getItem('token'); 
const baseurl = environment.baseurl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  "Authorization": "Bearer " + token })
}
// console.log("heasders",httpOptions)
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient,) { }

  getUser(): Observable<any> {
    console.log("inside service====",)
    return this.http.get(baseurl + "user").pipe(map(res => res))

  }
  getUserById(_id): Observable<any> {
    console.log("inside service====",)
    return this.http.get(baseurl + "user/"+_id).pipe(map(res => res))

  }
  login(data): Observable<any> {
    console.log("stdData- in service--->", data)
    return this.http.post(baseurl + 'user/login', data, httpOptions)
      .pipe(retry(1), map((data: any) => {
        return data;
      }),
        catchError(error => {
          return throwError(error);
        })
      )

  }
  // getUserEmail(): Observable<any> {
  //   return this.http.get(baseurl + 'user/userEmail')
  //     .pipe(map((data: any) => {
  //       return {
  //         data: data,
  //         params: new HttpParams().append('token', localStorage.getItem('token'))
  //       }
  //     }),
  //       catchError(error => {
  //         return throwError(error);
  //       })
  //     )
  // };
  signUp(userData): Observable<any> {
    console.log("inside userService-->", userData);
    return this.http.post(baseurl + 'user/signup', userData, httpOptions)
      .pipe(map(res => res));
  }
  deteleById(_id): Observable<any> {
    console.log("inside main services---delete", _id)
    return this.http.delete(baseurl + "user/" + _id)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  };
}
