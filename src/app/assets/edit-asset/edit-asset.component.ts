import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';
import { IFile } from '../models/asset.model';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import {
  AssetModel, AssetDetailModel, AssetCategoryModel, VendorModel, AssetClient, ResponseModel, DocumentModel,
} from 'src/app/sharedservice';
import { AssetService } from '../assets.service';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})

export class EditAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  filesToUpload: Array<IFile>;
  selectedFileNames: Array<IFile> = [];
  @ViewChild('assetForm') assetForm: NgForm;

  validDocument: boolean = true;
  validImage: boolean = true;

  assetData: AssetModel;
  asset_Category: AssetCategoryModel[];
  asset_Vendor: VendorModel[];
  responseMessage: ResponseModel;
  assetImage: DocumentModel;
  @Output() pevent: EventEmitter<any> = new EventEmitter();
  constructor(private assetClient: AssetClient, private assetService: AssetService, public bsModalRef: BsModalRef) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });


  }

  ngOnInit() {
    this.assetClient.getAllAssetCategory().subscribe((data) => {
      this.asset_Category = data
    }, (err) => { console.log(err) });
    this.assetClient.getAllVendor().subscribe((data) => { this.asset_Vendor = data }, (err) => { console.log(err) });
   if  (this.assetData.documentList != undefined)
    this.assetImage = this.assetData.documentList.filter(x => x.fileLabel == "AssetImage")[0];
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
    assetData.documentList = null;    
    if (assetData.id == 0) {
      this.assetService.SaveAsset(assetData, formData).subscribe(
        data => {
          this.responseMessage = data; console.log(this.responseMessage)
        },
        error => {
          this.responseMessage = error;
        }
      );
    }
    else {
      this.assetService.UpdateAsset(assetData, formData).subscribe(
        data => {
          this.responseMessage = data; console.log(this.responseMessage)

        },
        error => {
          this.responseMessage = error;
        }
      );
    }
  }

  closeForm() {
    this.pevent.emit({ data: "Parent Refreshed." });
    this.bsModalRef.hide();
  }

  executeValidator(controlName: string) {
    this.assetForm.controls[controlName].updateValueAndValidity();
  }

  DownloadDocument(documentId: string) {
    this.assetClient.downloadDocument(documentId).subscribe(data => { this.downloadFile(data) })
    //alert(documentId);
  }

  downloadFile(data: DocumentModel) {
    const linkSource = 'data:' + data.fileType + ';base64,' + data.fileImage;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = data.fileName;
    downloadLink.click();
  }

}


