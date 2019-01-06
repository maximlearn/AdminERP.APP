import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { first } from 'rxjs/operators';
import { IUserModel, LoginDetails } from './models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm : NgForm;
  error : string ='';
  
 userlogin : LoginDetails;
  constructor(private router: Router, private loginService : LoginService) {
    this.userlogin=new LoginDetails();
   }
  
  ngOnInit() {
   
  }

  Authenticate(userLogin : LoginDetails) {
   // let userName = userLogin.UserID;//this.loginForm.control["empId"].value;
   // let password =userLogin.Password;//this.loginForm.controls["password"].value;
    this.loginService.Authenticate(userLogin) .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/dashboard']);
        },
        error => {
            this.error = error;           
        });

  //  localStorage.setItem('isLoggedin', 'true');
}
}
