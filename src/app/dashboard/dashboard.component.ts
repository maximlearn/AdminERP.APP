import { Component, OnInit } from '@angular/core';
import { DashboardClient, DashboardModel, ResponseModel, AssetGatePassClient } from '../sharedservice';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ViewAssetGatePassComponent } from '../GatePassManagement/view-asset-gate-pass/view-asset-gate-pass.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashBoard : DashboardModel = <DashboardModel>{};
  responseMessage : ResponseModel;
  modalRef: BsModalRef;
  constructor(private dashBoardClient: DashboardClient,private gatePassClient: AssetGatePassClient,
    private modalService: BsModalService) { }

    ViewGatePassData(gatePassId: number)
  {
    const initialState = {
      gatePassData : <any>{}

    };

    this.gatePassClient.getGatePassDetailById(gatePassId).subscribe(
      data => {
        initialState.gatePassData = data;
        this.modalRef = this.modalService.show(ViewAssetGatePassComponent, { class: 'modal-lg', initialState });
       // this.modalRef.content.closeBtnName = 'Close';
      },
      error => {
        initialState.gatePassData = error.error;
      }
    );
    event.preventDefault();
  }
  ngOnInit() {
  this.dashBoardClient.getAllDashboardData(0).subscribe(data => 
    {
      this.dashBoard= data
    },  error => {
      this.responseMessage = error;
    })
  }

}
