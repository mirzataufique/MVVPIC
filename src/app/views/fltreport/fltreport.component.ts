import { Component, OnInit } from '@angular/core';
import { UserService}  from '../../Services/user.service';

@Component({
  selector: 'app-fltreport',
  templateUrl: './fltreport.component.html',
  styleUrls: ['./fltreport.component.css']
})
export class FltreportComponent implements OnInit {

  constructor(private userService:UserService) { }

  // logedInUser:any=[];
  userData:any []
  ngOnInit(): void {
    this.userService.getUser().subscribe((result)=>{
      this.userData = result;
      console.log('result', this.userData)
    })
    
  }
  tData: boolean = false;
  delete(_id){
    console.log("inside Delete-->",_id);
    this.tData = true;
    this.userService.deteleById(_id).subscribe((result)=>{
      console.log(result);
      this.userData.push(result);
    })
  }

}
