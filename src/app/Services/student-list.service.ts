import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';


// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {


 baseurl = 'http://localhost:3000/';


 constructor(private http: HttpClient) { }

  // getStudents() {
  //   return this.http.get(this.baseurl+"stdReport/").pipe(map(res => res))
    
  // }


}

