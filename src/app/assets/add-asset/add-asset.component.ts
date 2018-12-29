import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Asset, AssetCategory, AssetDetail, Vendor } from '../models/asset.model';

import { AssetsService } from '../assets.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  filesToUpload: Array<File>;
  selectedFileNames:Array<File>= [];
  @ViewChild('fileUpload') fileUploadVar: any;
  uploadResult: any;
  API_URL = 'https://localhost:44361/api/asset/';
 assetData = new Asset();
  assetDetail:AssetDetail[]= [{
    Id : 0,
          AssetId : 0,
          PurchaseDate :null,
          VendorId : null,
          Cost :null,
          WarrantyExpireDate : null,
          WarrantyDocumentId : null,
          BrandName: null,
          ModelNumber : null,
          SerialNumber  : null,
  }];

   private asset_category : AssetCategory[] =[
    { Id:4,CategoryName:'Hardware' },
    {  Id:7,CategoryName:'Software' },
    { Id:4,CategoryName:'Furniture' }];

    private asset_Vendor : Vendor[] =[
      { Id:1,VendorName:'Dell' },
      {  Id:1,VendorName:'Apple' },
      { Id:1,VendorName:'Microsoft' }];

   
  constructor(private assetService : AssetsService,private httpClient: HttpClient) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
});
this.assetData.AssetDetail = this.assetDetail;
  
   }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any)
  {
      //Clear Uploaded Files result message
      this.uploadResult = "";
      this.filesToUpload = <Array<File>>fileInput.target.files;

      for (let file of  this.filesToUpload)     
      {
          this.selectedFileNames.push(file);
      }
  }

  uploadFiles() : FormData
  {
      this.uploadResult = "";

      if (this.selectedFileNames.length > 0)
      {
          //this.isLoadingData = true;

          const formData = new FormData();
          for (let file of this.selectedFileNames)
            formData.append(file.name, file);

          // for (var i = 0; i < this.filesToUpload.length; i++)
          // {
          //     formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
          // }

          // this.httpClient.post(this.API_URL+'AddAsset',formData ).subscribe(
          //   data => {
          //       console.log("POST Request is successful ", data);
          //   },
          //   error => {
          //       console.log("Error", error);
          //   }
          // ); 

          return formData;

         // let apiUrl = "/api/Upload/UploadFiles";

          // this.http.post(apiUrl, formData)
          //     .map((res: Response) => res.json())
          //     .subscribe
          //     (
          //         data => {
          //             this.uploadResult = data;
          //             this.errorMessage = "";
          //         },
          //         err => {
          //             console.error(err);
          //             this.errorMessage = err;
          //             this.isLoadingData = false;
          //         },
          //         () => {
          //             this.isLoadingData = false,
          //                 this.fileUploadVar.nativeElement.value = "";
          //             this.selectedFileNames = [];
          //             this.filesToUpload = [];
          //         }
          //     );
      }
  }

 SaveAsset(assetData : Asset) : void {
  let formData = this.uploadFiles();
   this.assetService.addAsset(assetData,formData);
 }

}
