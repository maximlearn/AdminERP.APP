// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { IUserRoleModel } from '../login/models/user.model';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { AuthClient } from '../sharedservice';

// @Injectable({
//   providedIn: 'root'
// })
// export class LayoutService {
//   constructor(private authClient: AuthClient) { }

//   GetUserRoleMenuFunction(roleId: number) {
//     return this.authClient.getUserRoleMenuFunctions(roleId).pipe(catchError(this.errorHandler));
//   }

//   private errorHandler(errorResponse: HttpErrorResponse) {
//     if (errorResponse.error instanceof ErrorEvent) {
//       console.error('Client Side Error : - ' + errorResponse.error.message)
//     }
//     else {
//       console.error('Server Side Error : - ' + errorResponse);
//     }
//     return throwError("There is problem with the service.We are notified. Please try again later...");
//   }
// }
