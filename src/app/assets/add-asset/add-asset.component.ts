import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IFile } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { AssetModel, AssetDetailModel, AssetCategoryModel, VendorModel, AssetClient, SaveAssetRequestModel, ResponseModel, 
   } from 'src/app/sharedservice';
import { AssetService } from '../assets.service';

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
 
  isVisible : boolean = false;

  assetData: AssetModel ;
  assetDetail: AssetDetailModel;
  asset_Category : AssetCategoryModel[];
  asset_Vendor : VendorModel[];
  saveAssetRequestModel: SaveAssetRequestModel;
  responseMessage: ResponseModel; 

  constructor(private assetClient : AssetClient,private assetService : AssetService ) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false,dateInputFormat: 'DD/MM/YYYY'});
       
        this.assetData=new AssetModel(); 
        this.assetData.assetDetail = [];
        this.assetData.assetDetail.push(new AssetDetailModel());        
      }

  ngOnInit() {
    this.assetClient.getAllAssetCategory().subscribe((data) =>{ 
      this.asset_Category = data 
    } , (err) => { console.log(err)});
    this.assetClient.getAllVendor().subscribe((data) =>{ this.asset_Vendor=data } , (err) => { console.log(err)});
  }

  fileChangeEvent(fileInput: any,fileInputLabel : string)
  {    
      this.uploadResult = "";
      this.filesToUpload = <Array<IFile>>fileInput.target.files;
      fileInput.target.nextSibling.innerHTML= this.filesToUpload[0].name;
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
          const formData = new FormData();
          for (let file of this.selectedFileNames)
            formData.append(file.filelabel, file);      
          return formData;
      }
  }

SaveAsset(assetData : AssetModel) {
  let formData = this.uploadFiles();
  this.isVisible = true;
 
  // this.saveAssetRequestModel =new SaveAssetRequestModel();
  // this.saveAssetRequestModel.assetData=assetData;
  // this.saveAssetRequestModel.formData=formData;
 // this.saveAssetRequestModel.assetData.assetDetail.push(assetDetail);

  //this.saveAssetRequestModel.assetData.assetDetail.push(assetDetail);

  this.assetService.SaveAsset(assetData,formData).subscribe(
    data => {
    this.responseMessage=data;
    },
    error => {
      this.responseMessage = error.error;
    }
  );
}

executeValidator(controlName : string) {
  this.assetForm.controls[controlName].updateValueAndValidity();

}
}
