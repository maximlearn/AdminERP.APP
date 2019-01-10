import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUserRoleModel } from '../login/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  API_URL = 'https://localhost:44361/api/Auth/';
  constructor(private httpClient : HttpClient) { }

  GetUserRoleMenuFunction(roleId : number) {
   return  this.httpClient.get<IUserRoleModel>(`${this.API_URL + 'UserRoleMenuFunction?roleId='}${roleId}`)
   .pipe(catchError(this.errorHandler));
      }
  // .pipe(map(user => {
  //   // login successful if there's a jwt token in the response
  //   if (user && user.token) {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //   }
  //   return user;
  //   }));  
  

  private errorHandler(errorResponse: HttpErrorResponse)
{
  if (errorResponse.error instanceof ErrorEvent){
    console.error('Client Side Error : - ' + errorResponse.error.message)
  }
  else {
    console.error('Server Side Error : - ' + errorResponse);
  } 
  return throwError("There is problem with the service.We are notified. Please try again later...");
}
}
