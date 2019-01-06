import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, observable } from 'rxjs';
import { IAssetModel, IAssetCategoryModel, IVendorModel, IMessage, IResponseMessage } from './models/asset.model';
import { FormGroup, FormControl } from '@angular/forms';
//import { IAssetModel } from '../auto.generated';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
API_URL = 'https://localhost:44361/api/asset/';
  constructor(private httpClient: HttpClient) { }

// form: FormGroup({
//   $key: new FormControl(null),
//   Id  : number;
//   AssetTagId : string ;
//   AssetName : string ;
//   AssetCategoryId : number;
//   AssetDescription : string;
//   IsActive : boolean;
//   CreatedBy : number;
//   CreatedDate : Date;
//   ModifiedBy : number ;
//   ModifiedDate : Date;
//   AssetCategory : IAssetCategoryModel ;
//   AssetDetail : IAssetDetailModel[];
//   VendorModel  : IVendorModel;
//   Message :  string;
// })

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
    console.error('Server Side Error : - ' + errorResponse);
  } 
  return throwError("There is problem with the service.We are notified. Please try again later...");
}

public getAssetById(assetId: number)   {
  return this.httpClient.get<IAssetModel>(`${this.API_URL + 'getasset?assetId='}${assetId}`);
}

public addAsset(assetData : IAssetModel, formData : FormData)   {
  let params = new HttpParams();
  params = params.set('assetData', JSON.stringify(assetData));
  const HttpHeaderOptions = {
    headers: { 'Accept': 'application/json' },
    //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
    params : params
    }
    return this.httpClient.post<IResponseMessage>(this.API_URL+'AddAsset',formData,HttpHeaderOptions)
  }
}
