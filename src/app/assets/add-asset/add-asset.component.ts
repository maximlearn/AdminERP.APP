import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IAssetModel, IAssetCategoryModel, IAssetDetailModel, IVendorModel, IMessage } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';
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
  IsVisible : boolean = false;
  errorMessage : string;
  IsSuccess : boolean =false;
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
  //  private asset_category : IAssetCategoryModel[] =[
  //   { Id:4,CategoryName:'Hardware' },
  //   {  Id:7,CategoryName:'Software' },
  //   { Id:4,CategoryName:'Furniture' }];

  //   private asset_Vendor : IVendorModel[] =[
  //     { Id:1,VendorName:'Dell' },
  //     {  Id:1,VendorName:'Apple' },
  //     { Id:1,VendorName:'Microsoft' }];

   
  constructor(private assetService : AssetsService,private httpClient: HttpClient) {
    this.datePickerConfig = Object.assign({}, 
      { containerClass: 'theme-dark-blue', showWeekNumbers: false,dateInputFormat: 'DD/MM/YYYY'});
        this.assetData.AssetDetail = this.assetDetail;
      }

  ngOnInit() {
  this.assetService.getAssetCategoryList().subscribe((data) =>{ console.log(data); this.asset_Category=data } , (err) => { console.log(err)});
  this.assetService.getVendorList().subscribe((data) =>{ console.log(data); this.asset_Vendor=data } , (err) => { console.log(err)});
  }

  fileChangeEvent(fileInput: any)
  {
      this.uploadResult = "";
      this.filesToUpload = <Array<File>>fileInput.target.files;
      fileInput.target.nextSibling.innerHTML= this.filesToUpload[0].name;
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
          return formData;

      }
  }
 
 SaveAsset(assetData : IAssetModel)    {
  let formData = this.uploadFiles();
 
   this.assetService.addAsset(assetData,formData).subscribe(
    data => {
        this.errorMessage="Asset saved successfully.";
        this.IsVisible=true;
        this.IsSuccess = true;
    },
    error => {
      this.errorMessage="There is problem with the service.We are notified. Please try again later...";
      this.IsVisible=true; 
      this.IsSuccess = false; 
     // this.errorHandler;
        //console.log("Error", error);
    }
  );
  // this.IsVisible = message.IsActive;
  // this.errorMessage= message.Message;
 
 }
 

}
