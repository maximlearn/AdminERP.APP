import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, observable } from 'rxjs';
import { Asset } from './models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
API_URL = 'https://localhost:44361/api/asset/';
  constructor(private httpClient: HttpClient) { }

public getAssetList() {
  return this.httpClient.get(this.API_URL + 'GetAll').pipe(catchError(this.errorHandler));
}

private errorHandler(errorResponse: HttpErrorResponse)
{
  if (errorResponse.error instanceof ErrorEvent){
    console.error('Client Side Error : - ' + errorResponse.error.message)
  }
  else {
    console.error('Server Side Error : - ' + errorResponse)
  }
    return throwError("There is problem with the service.We are notified. Please try again later...");

}

public getAsset(assetId) {
  return this.httpClient.get(`${this.API_URL + 'assetslist'}/${assetId}`);
}

public addAsset(assetData : Asset, formData : FormData) {
  
 this.httpClient.post(this.API_URL+'AddAsset',assetData ).subscribe(
  data => {
      console.log("POST Request is successful ", data);
  },
  error => {
      console.log("Error", error);
  }
);   


this.httpClient.post(this.API_URL+'UploadAssetDocument',formData ).subscribe(
  data => {
      console.log("POST Request is successful ", data);
  },
  error => {
      console.log("Error", error);
  }
);   
}

}
