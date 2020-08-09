import { Component, OnInit } from '@angular/core';

import { StudentListService } from 'src/app/Services/student-list.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public AllData = [];

  constructor(private _studentService: StudentListService) { }

  ngOnInit() {
    // // this._studentService.getStudents().subscribe((data) => {
    // //   // console.log("my data-- ", JSON.stringify(data))
    // //   this.AllData = data;
    // })

    // console.log("====>", this.AllData);

  }
  /**
   * signUpdeatl=[{}] */

  public uname;
  public pass;
  public cnfpass;

  // public signUpdeatails=[{
  //   "user" :this.uname,
  //   "pass" :this.pass,
  //   "cnfpass": this.cnfpass
  // }] 
    
 

  signUp(){
    console.log("hello----",this.uname);
  }

}
