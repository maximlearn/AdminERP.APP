import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IFile } from '../models/asset.model';
import { map, catchError } from 'rxjs/operators';
import {
  AssetModel, AssetDetailModel, AssetCategoryModel, VendorModel, AssetClient, ResponseModel,
} from 'src/app/sharedservice';
import { AssetService } from '../assets.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  title: string;
  closeBtnName: string;
  assetData: AssetModel;

  constructor(public bsModalRef: BsModalRef) {
    // this.assetData=new IAssetModel();
  }

  ngOnInit() {

  }

}
