import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IAssetModel } from '../models/asset.model';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  title: string;
  closeBtnName: string; 
  assetData: IAssetModel;

  constructor(public bsModalRef: BsModalRef) {
   // this.assetData=new IAssetModel();
   }

  ngOnInit() {

  }

}
