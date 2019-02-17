import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AssetModel, ResponseModel, CompanyModel } from '../sharedservice';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // private httpClient: HttpClient;
  // private baseUrl: string;
 //private API_URL =  'https://localhost:44361'; //'https://adminerp.azurewebsites.net/'; //
  private API_URL =  'https://adminerp.azurewebsites.net'; //'https://adminerp.azurewebsites.net/'; //
  constructor(private httpClient: HttpClient) { }
//   constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
//     this.httpClient = http;    
//     this.baseUrl = baseUrl ? baseUrl : "";
// }

  private errorHandler(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error : - ' + errorResponse.error.message)
    }
    else {
      console.error('Server Side Error : - ' + errorResponse);
    }
    return throwError("There is problem with the service.We are notified. Please try again later...");
  }

  public SaveAsset(assetData: AssetModel, formData: FormData) {
    let url = this.API_URL + "/api/Asset/AddAsset"
    let params = new HttpParams();
    params = params.set('assetData', JSON.stringify(assetData));
    const HttpHeaderOptions = {
      headers: { 'Accept': 'application/json' },
      //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
      params: params
    }
    return this.httpClient.post<ResponseModel>(url, formData, HttpHeaderOptions)
  }


  public UpdateAsset(assetData: AssetModel, formData: FormData) {
    let url = this.API_URL + "/api/Asset/UpdateAsset"
    let params = new HttpParams();
    params = params.set('assetData', JSON.stringify(assetData));
    const HttpHeaderOptions = {
      headers: { 'Accept': 'application/json' },
      //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
      params: params
    }
    return this.httpClient.post<ResponseModel>(url, formData, HttpHeaderOptions)
  }

  public SaveCompany(company: CompanyModel, formData: FormData) {
    let url = this.API_URL + "/api/company/SaveCompany";
    let params = new HttpParams();
    params = params.set('companyData', JSON.stringify(company));
    const HttpHeaderOptions = {
      headers: { 'Accept': 'application/json' },
      //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
      params: params
    }
    return this.httpClient.post<ResponseModel>(url, formData, HttpHeaderOptions)
  }


  public UpdateCompany(company: CompanyModel, formData: FormData) {
    let url = this.API_URL + "/api/company/UpdateCompany";
    let params = new HttpParams();
    params = params.set('companyData', JSON.stringify(company));
    const HttpHeaderOptions = {
      headers: { 'Accept': 'application/json' },
      //headers: { 'Content-type': 'application/json', 'dataType': 'json' },
      params: params
    }
    return this.httpClient.post<ResponseModel>(url, formData, HttpHeaderOptions)
  }
}
