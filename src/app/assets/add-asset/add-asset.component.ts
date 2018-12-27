import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Asset, AssetCategory } from '../models/asset.model';
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

   
  constructor() {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
});
   }

  ngOnInit() {
  }

}
