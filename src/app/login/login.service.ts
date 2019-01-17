// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { LoginDetails } from './models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   API_URL = 'https://localhost:44361/api/Auth/';
//   constructor(private httpClient : HttpClient) { }

//   Authenticate(userLogin: LoginDetails) {
//   return  this.httpClient.post<any>(this.API_URL + 'Authenticate',userLogin)
//   .pipe(map(user => {
//     // login successful if there's a jwt token in the response
//     if (user && user.token) {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('currentUser', JSON.stringify(user));
//     }
//     return user;
//     }));  
//   }
// }
