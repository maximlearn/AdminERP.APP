import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AssetGatePassModel } from 'src/app/sharedservice';


@Component({
  selector: 'app-view-asset-gate-pass',
  templateUrl: './view-asset-gate-pass.component.html',
  styleUrls: ['./view-asset-gate-pass.component.scss']
})
export class ViewAssetGatePassComponent implements OnInit {
  title: string;
  closeBtnName: string;
  gatePassData: AssetGatePassModel;  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
