import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AssetModel } from 'src/app/sharedservice';


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
