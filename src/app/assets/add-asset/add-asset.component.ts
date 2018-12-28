import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Asset, AssetCategory, AssetDetail, Vendor } from '../models/asset.model';
import { assertDataInRange } from '@angular/core/src/render3/state';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
 assetData = new Asset();



 
  
   private asset_category : AssetCategory[] =[
    { Id:1,CategoryName:'Hardware' },
    {  Id:1,CategoryName:'Software' },
    { Id:1,CategoryName:'Furniture' }];

    private asset_Vendor : Vendor[] =[
      { Id:1,VendorName:'Dell' },
      {  Id:1,VendorName:'Apple' },
      { Id:1,VendorName:'Microsoft' }];

   
  constructor() {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
});
   this.assetData.AssetDetailModel = new AssetDetail();
  
   }

  ngOnInit() {
  }

 

}
