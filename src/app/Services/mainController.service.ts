import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainControllerService {

  constructor(private http: HttpClient) { }
  baseurl = 'http://localhost:3000/';

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
