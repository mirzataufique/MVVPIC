import { Component, OnInit } from '@angular/core';
import { StudentListService } from 'src/app/Services/student-list.service';
import { MainControllerService } from 'src/app/Services/mainController.service';

// import {IStudent} from '../../Modal/studentInterfacce';

@Component({
  selector: 'app-addmission',
  templateUrl: './addmission.component.html',
  styleUrls: ['./addmission.component.css']
})
export class AddmissionComponent implements OnInit {
  //  public myid="std_id";
  //  public myname ="";
  public greeting = "";

  //  studentModel = new Student(101,'salman','khan','hnjb','3/3/1977',98652565,'kurla west','IT','abc@gamil.com');
  public stdData = [];
  public std_name;
  public std_father;
  public std_mother;
  public std_email;
  public std_dob;
  public std_department;
  public std_mobile;
  public std_address;
  constructor(private _studentService: StudentListService, private _mainService: MainControllerService) { }
  ngOnInit() {
    // this._studentService.getStudents().subscribe((data)=>{
    //   console.log("addmission data===>",JSON.stringify(data));
    //    this.Student = data;
    //   });

  }
  getRandom() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  clickeMethod(event) {

    console.log("save student clicked")
    var std_id = this.getRandom();
    console.log("===>", std_id)
    this.stdData = [{
      "std_id": std_id,
      "std_name": this.std_name,
      "std_father": this.std_father,
      "std_mother": this.std_mother,
      "std_email": this.std_email,
      "std_dob": this.std_dob,
      "std_department": this.std_department,
      "std_mobile": this.std_mobile,
      "std_address": this.std_address

    }]
    console.log("Formdata----->", this.stdData);
    this._mainService.post(this.stdData);

  }




}
