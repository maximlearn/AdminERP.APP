import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { IFile } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import {
  AssetModel, AssetDetailModel, AssetCategoryModel, VendorModel, AssetClient, ResponseModel,
} from 'src/app/sharedservice';
import { CommonService } from 'src/app/shared/common-service.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  filesToUpload: Array<IFile>;
  selectedFileNames: Array<IFile> = [];
  @ViewChild('assetForm') assetForm: NgForm;

  validDocument: boolean = true;
  validImage: boolean = true;
  assetData: AssetModel;
  assetDetail: AssetDetailModel;
  asset_Category: AssetCategoryModel[];
  asset_Vendor: VendorModel[];

  responseMessage : ResponseModel;
  constructor(private assetClient: AssetClient, private assetService: CommonService) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });

    this.assetData = this.getDefaultAssetModel();
  }

  getDefaultAssetModel()
  {
    return <AssetModel>{ assetCategoryId:-101, assetDetail : [{}] } ;
  }

  ngOnInit() {
    this.assetClient.getAllAssetCategory().subscribe((data) => {
      this.asset_Category = data
    }, (err) => { console.log(err) });
    this.assetClient.getAllVendor().subscribe((data) => { this.asset_Vendor = data }, (err) => { console.log(err) });
  }
 

  fileChangeEvent(fileInput: any, fileInputLabel: string) {
 
    this.filesToUpload = <Array<IFile>>fileInput.target.files;

    var fileType = this.filesToUpload[0].type;
    var allowed;
    var found = false;
    if (fileInputLabel.indexOf("Document") > 0) {
      allowed = ["pdf", "doc", "docx"];
      this.validDocument = true
      allowed.forEach(function (item, index) {
        if (fileType.match('application/' + item)) { found = true; }
      })
      if (!found) {
        this.validDocument = false;
        return;
      }
    }
    if (fileInputLabel.indexOf("Image") > 0) {
      allowed = ["jpeg", "png", "gif", "jpg"];
      this.validImage = true
      allowed.forEach(function (item, index) {
        if (fileType.match('image/' + item)) { found = true; }
      })
      if (!found) {
        this.validImage = false;
        return;
      }
    }

    fileInput.target.nextSibling.innerHTML = this.filesToUpload[0].name;
    if (this.selectedFileNames.some(x => x.filelabel === fileInputLabel)) {
      this.selectedFileNames = this.selectedFileNames.filter(x => x.filelabel !== fileInputLabel);
    }
    for (let file of this.filesToUpload) {
      file.filelabel = fileInputLabel;
      this.selectedFileNames.push(file);
    }
  }

  resetForm() {
    this.assetForm.reset();
    this.responseMessage=null;
    $(".warrantyDocument").html('Browse Warranty Document');
    $(".assetImage").html('Browse Asset Image');

  }
  uploadFiles(): FormData {   

    if (this.selectedFileNames.length > 0) {
      const formData = new FormData();
      for (let file of this.selectedFileNames)
        formData.append(file.filelabel, file);
      return formData;
    }
  }

  SaveAsset(assetData: AssetModel) {
    let formData = this.uploadFiles();
      this.assetService.SaveAsset(assetData, formData).subscribe(
        data => {
         
          this.responseMessage = data;
         
           console.log(this.responseMessage)
        },
        error => {
          this.responseMessage = error;
        }
      );
    }
  executeValidator(controlName: string) {
    this.assetForm.controls[controlName].updateValueAndValidity();

  }
}
