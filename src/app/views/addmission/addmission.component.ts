import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainControllerService } from 'src/app/Services/mainController.service';



@Component({
  selector: 'app-addmission',
  templateUrl: './addmission.component.html',
  styleUrls: ['./addmission.component.css']
})
export class AddmissionComponent implements OnInit {

  // public greeting = "";

  formData: any[];
  constructor(private _mainService: MainControllerService, public router: Router) { }
  ngOnInit() {

  }
  // getRandom() {
  //   return Math.floor(100000 + Math.random() * 900000);
  // var std_id = this.getRandom();
  // console.log("===>", std_id)
  // }
  public isDisable = false;
  public successMsg: boolean = false;
  public errorMsg: boolean = false;
  msg;
  onSubmit(data) {

    console.log("save student clicked", data);
    this._mainService.addStudent(data).subscribe((result) => {
      console.log('result', result.message);
      this.msg = result.message;
      this.successMsg = true;
      // this.router.navigate(['/report'])
    }, (error) => {
      console.log('An unexpected error occured', error.error.message);
      this.msg = error.error.message;
      this.errorMsg = true;
      this.router.navigate(['/admission']);
    }, () => {
      console.log('Completed');
    });
    // this.router.navigate(['/report'])
  }
}