import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { AssetModel, ResponseModel, CompanyModel, UserModel } from '../sharedservice';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
 private API_URL =  'http://adminerp.southeastasia.cloudapp.azure.com/API/';
 private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor(private httpClient: HttpClient) { }


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

  public GetUserData(): UserModel {
    let userData: UserModel;
    userData = JSON.parse(localStorage.getItem('currentUser'));
    return userData;   
    }

    public PdfDownLoad(pdfData: HTMLElement)
    {}

    public show() {
      this.loaderSubject.next(<LoaderState>{ show: true });
    }
    public hide() {
      this.loaderSubject.next(<LoaderState>{ show: false });
    }
}

export interface LoaderState {
  show: boolean;
}
