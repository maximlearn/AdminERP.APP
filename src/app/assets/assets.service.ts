import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, observable } from 'rxjs';
import { IAssetModel, IAssetCategoryModel, IVendorModel, IMessage } from './models/asset.model';
//import { IAssetModel } from '../auto.generated';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
API_URL = 'https://localhost:44361/api/asset/';
  constructor(private httpClient: HttpClient) { }

public getAssetList() {
  return this.httpClient.get<IAssetModel[]>(this.API_URL + 'GetAll').pipe(catchError(this.errorHandler));
}

public getAssetCategoryList() {
  return this.httpClient.get<IAssetCategoryModel[]>(this.API_URL + 'GetAllAssetCategory').pipe(catchError(this.errorHandler));
}

public getVendorList() {
  return this.httpClient.get<IVendorModel[]>(this.API_URL + 'GetAllVendor').pipe(catchError(this.errorHandler));
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

public getAssetById(assetId: number) {
  return this.httpClient.get(`${this.API_URL + 'assetslist'}/${assetId}`);
}

public addAsset(assetData : IAssetModel, formData : FormData)   { 
  if  ((formData !=null) && (formData !=undefined))
  {
    this.httpClient.post(this.API_URL+'UploadAssetDocument',formData ).subscribe(
        data => {
            console.log("POST Request is successful ", data);
    },
        error => {
            this.errorHandler;
        }
    );
  }
  return this.httpClient.post<IAssetModel>(this.API_URL+'AddAsset',assetData);
  }
}
