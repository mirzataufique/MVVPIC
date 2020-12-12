import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage;
  constructor(private userService: UserService, private routes: Router, private activatedRoute: ActivatedRoute) {
    this.registerForm = new FormGroup({
      userEmail: new FormControl(null, Validators.email && Validators.required),
      userName: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required),
      cnfPassword: new FormControl(null, this.passValidator),
      userType: new FormControl(null, Validators.required)
    });
    this.registerForm.controls.userPassword.valueChanges
      .subscribe(x => { this.registerForm.controls.cnfPassword.updateValueAndValidity() })
  }

  register() {
    console.log("hello", this.registerForm.value)
    if (this.registerForm.valid) {
      this.userService.signUp(this.registerForm.value)
        .subscribe(
          data => this.successMessage = "Registered",
          error => this.successMessage = " Failed"
        )
    }
  }
  ngOnInit(): void {
  }
  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null) || control.value !== undefined) {
      const cnfPassValue = control.value;

      const passControl = control.root.get('userPassword')
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfPassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }
  moveToLogin() {
    console.log("go to login====>")
    this.routes.navigate(['../login'], { relativeTo: this.activatedRoute })
  }
}
