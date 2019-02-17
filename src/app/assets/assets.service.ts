// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
// import { map, catchError } from 'rxjs/operators';
// import { Observable, throwError, observable } from 'rxjs';
// import { FormGroup, FormControl } from '@angular/forms';
// import { AssetModel, ResponseModel } from '../sharedservice';


// @Injectable({
//   providedIn: 'root'
// })
// export class AssetService {
//   API_URL = 'https://localhost:44361/api/Asset/';
//   constructor(private httpClient: HttpClient) { }

// private errorHandler(errorResponse: HttpErrorResponse)
// {
//   if (errorResponse.error instanceof ErrorEvent){
//     console.error('Client Side Error : - ' + errorResponse.error.message)
//   }
//   else {
//     console.error('Server Side Error : - ' + errorResponse);
//   }
//   return throwError("There is problem with the service.We are notified. Please try again later...");
// }

// public SaveAsset(assetData : AssetModel, formData : FormData)  {
//   let params = new HttpParams();
//   params = params.set('assetData', JSON.stringify(assetData));
//   const HttpHeaderOptions = {
//     headers: { 'Accept': 'application/json' },
//     //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
//     params : params
//     }
//     return this.httpClient.post<ResponseModel>(this.API_URL+'AddAsset',formData,HttpHeaderOptions)
//   }


// public UpdateAsset(assetData : AssetModel, formData : FormData)  {
//   let params = new HttpParams();
//   params = params.set('assetData', JSON.stringify(assetData));
//   const HttpHeaderOptions = {
//     headers: { 'Accept': 'application/json' },
//     //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
//     params : params
//     }
//     return this.httpClient.post<ResponseModel>(this.API_URL+'UpdateAsset',formData,HttpHeaderOptions)
//   }
// }
