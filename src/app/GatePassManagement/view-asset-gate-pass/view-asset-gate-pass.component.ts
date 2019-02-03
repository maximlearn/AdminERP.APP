import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AssetGatePassModel, DocumentModel } from 'src/app/sharedservice';


@Component({
  selector: 'app-view-asset-gate-pass',
  templateUrl: './view-asset-gate-pass.component.html',
  styleUrls: ['./view-asset-gate-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAssetGatePassComponent implements OnInit {
  title: string;
  closeBtnName: string;
  gatePassData: AssetGatePassModel; 
  assetImage : DocumentModel; 
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.assetImage = this.gatePassData.company
  }

}
