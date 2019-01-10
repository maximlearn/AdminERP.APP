import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IAssetModel, IAssetCategoryModel, IAssetDetailModel, IVendorModel, IMessage, IResponseMessage, IFile } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';
import { AssetsService } from '../assets.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { AssetModel, AssetDetailModel, AssetCategoryModel, VendorModel, AssetClient, SaveAssetRequestModel, ResponseModel } from 'src/app/auto.generated';

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
  //API_URL = 'https://localhost:44361/api/asset/';
  isVisible : boolean = false;

  assetData: AssetModel;
  assetDetail: AssetDetailModel[];
  assetCategory : AssetCategoryModel[];
  assetVendor : any;
  saveAssetRequestModel: SaveAssetRequestModel;
  responseMessage: ResponseModel;


  constructor(private assetService : AssetClient, private httpClient: HttpClient) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false,dateInputFormat: 'DD/MM/YYYY'});
        // this.assetData.assetCategoryId=-101;
        // this.assetData.assetDetail = this.assetDetail;
        // this.assetData.assetDetail[0].vendorId=0;
      }

  ngOnInit() {
    this.assetService.getAllAssetCategory().subscribe((data) =>{ this.assetData=data } , (err) => { console.log(err)});
    this.assetService.getAllVendor().subscribe((data) =>{ this.assetVendor=data } , (err) => { console.log(err)});
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
          //this.isLoadingData = true;

          const formData = new FormData();
          for (let file of this.selectedFileNames)
            formData.append(file.filelabel, file);
          // formData.append(file.name, file);
          return formData;

      }
  }

SaveAsset(assetData : AssetModel) {
  let formData = this.uploadFiles();

  this.isVisible = true;
  this.saveAssetRequestModel.formData=formData;
  this.saveAssetRequestModel.assetData=assetData;

  this.assetService.saveAsset(this.saveAssetRequestModel).subscribe(
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
