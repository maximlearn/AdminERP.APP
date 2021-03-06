import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginDetails, AuthClient } from 'src/app/sharedservice';
import { NumberSequence } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { CommonService, LoaderState } from '../shared/common-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit  {
  @ViewChild('loginForm') loginForm: NgForm;
  error: string = '';
  userlogin = <LoginDetails>{};
  //showLoadingIndicator: Boolean = true;
  
  constructor(private router: Router, private authClient: AuthClient) {
   
  }

  ngOnInit() {
   
   }
  
  Authenticate(userLogin: LoginDetails) {
  
    this.authClient.authenticate(userLogin).pipe(first())
      .subscribe(
        user => {
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
           // this.loading = false;
            this.router.navigate(['/dashboard']);
          }         
        },
        error => {
          //this.loading = false;
          this.error = error;
        });
  }
}
