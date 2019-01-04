import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IAssetModel, IAssetCategoryModel, IAssetDetailModel, IVendorModel, IMessage, IResponseMessage, IFile } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';
import { AssetsService } from '../assets.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  filesToUpload: Array<IFile>;
  selectedFileNames:Array<IFile>= [];
  @ViewChild('assetForm') assetForm : NgForm;
  uploadResult: any;
  API_URL = 'https://localhost:44361/api/asset/';
  IsVisible : boolean = false;
  responseMessage : IResponseMessage ;
  assetData = new IAssetModel();
  assetDetail:IAssetDetailModel[]= [{
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
  asset_Category : IAssetCategoryModel[] =[];
  asset_Vendor : IVendorModel[] = [];


  constructor(private assetService : AssetsService,private httpClient: HttpClient) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false,dateInputFormat: 'DD/MM/YYYY'});
        this.assetData.AssetCategoryId=-101;
        this.assetData.AssetDetail = this.assetDetail;
        this.assetData.AssetDetail[0].VendorId=0;
      }

  ngOnInit() {
  this.assetService.getAssetCategoryList().subscribe((data) =>{ console.log(data); this.asset_Category=data } , (err) => { console.log(err)});
  this.assetService.getVendorList().subscribe((data) =>{ console.log(data); this.asset_Vendor=data } , (err) => { console.log(err)});
  }

  fileChangeEvent(fileInput: any,fileInputLabel : string)
  {
      this.uploadResult = "";
      this.filesToUpload = <Array<IFile>>fileInput.target.files;
      fileInput.target.nextSibling.innerHTML= this.filesToUpload[0].name;
    //  fileInput.target.
      for (let file of  this.filesToUpload)
      {
         file.filelabel = fileInputLabel;
         this.selectedFileNames.push(file);
      }
  }

  resetForm()
  {
    this.assetForm.reset();
    $(".warrantyDocument").html('Browse Warranty Document');
    $(".assetImage").html('Browse Asset Image');

  }

  uploadFiles() : FormData
  {
      this.uploadResult = "";

      if (this.selectedFileNames.length > 0)
      {
          //this.isLoadingData = true;

          const formData = new FormData();
          for (let file of this.selectedFileNames)
            formData.append(file.filelabel, file);
           // formData.append(file.name, file);
          return formData;

      }
  }

 SaveAsset(assetData : IAssetModel)    {
  let formData = this.uploadFiles();

  this.IsVisible = true;
   this.assetService.addAsset(assetData,formData).subscribe(
    data => {
       this.responseMessage=data;
    },
    error => {
      this.responseMessage = error.error;
    }
  );
 }

 executeValidator(controlName : string)
 {
  this.assetForm.controls[controlName].updateValueAndValidity();

 }


}
