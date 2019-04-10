import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { AssetGatePassClient, ResponseModel, AssetGatePassModel, StatusModel } from 'src/app/sharedservice';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ViewAssetGatePassComponent } from '../view-asset-gate-pass/view-asset-gate-pass.component';
import { EditAssetGatePassComponent } from '../edit-asset-gate-pass/edit-asset-gate-pass.component';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-list-gate-pass',
  templateUrl: './list-gate-pass.component.html',
  styleUrls: ['./list-gate-pass.component.scss']
})
export class ListGatePassComponent implements OnInit {
  paginationPageSize : number;
  paginationNumberFormatter : any;
  private gridApi;
  modalRef: BsModalRef;
  rowData: any;
  gatePassId: number;
  gatePassData : AssetGatePassModel = <AssetGatePassModel>{ 
    gatePassStatus : <StatusModel>{} }
  responseMessage: ResponseModel;
  CommentApproveReject : string;
  @ViewChild('template') approveReject: TemplateRef<any>;
  constructor(private gatePassClient: AssetGatePassClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };

  }
  columnDefs = [
    // tslint:disable-next-line:max-line-length
    { headerName: 'Action', cellRenderer: function (params) {     
      console.log(params.data.gatePassStatus.statusName);
       var html =''
      var style="style='display:none'"
      if (params.data.gatePassStatus.statusName == 'Pending') {
        style = "style='display:collaspe'"
          //display = 'block';
      }  
      console.log(style);   
      return '<a title=\'Approve/Reject\''+ style +'><i data-action-type=\'approve\' style=\'font-size:0.9rem\' class=\'fa fa-check-circle\'></i>&nbsp;</a><a title=\'View\' ><i data-action-type=\'view\' class=\'fa fa-building fa-fw\'></i></a>&nbsp;<a title=\'Edit\'><i data-action-type=\'edit\' class=\'fa fa-pencil-square-o fa-fw\'></i></a>&nbsp<a title=\'delete\'><i data-action-type=\'delete\' class=\'fa fa-trash-o fa-fw\'></i></a>';

  },
     width: 130 },
    { headerName: 'Gate Pass No', field: 'gatePassNo', width: 150 },
    {
      headerName: 'Gate Pass Date', cellRenderer: function (params) {
        return (params.data.gatePassDate === undefined) ? '' : new DatePipe('en-US').transform(params.data.gatePassDate, 'dd/MM/yyyy')
      }, width: 160
    },
    { headerName: 'Gate Pass Type', field: 'gatePassType.typeName', width: 150 },
    { headerName: 'Gate Pass Status', field: 'gatePassStatus.statusName', width: 150 },
    {
      headerName: 'Prepared By', cellRenderer: function (params) {
        return params.data.createdByNavigation.firstName + ' ' + params.data.createdByNavigation.lastName;
      }, width: 150
    },
    {
      headerName: 'Received By', cellRenderer: function (params) {
        return params.data.receivedByNavigation.firstName + ' ' + params.data.receivedByNavigation.lastName;
      }, width: 150
    }
  ]

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute('data-action-type');
      this.responseMessage=null;
      this.gatePassData.comment=null;
      switch (actionType) {
        case 'view':
          this.gatePassId = e.data.id;
          return this.openModalWithComponent();
        case 'edit':
          this.gatePassId = e.data.id;
          return this.openModalForEdit();
        case 'delete':
          this.gatePassId = e.data.id;
          return this.deleteAssetGatePass(this.gatePassId);
          case 'approve':  
          this.gatePassId=e.data.id;
          this.gatePassData.comment=null;          
          return this.openModalforApproveReject(this.approveReject);
      }
    }
  }

  deleteAssetGatePass(gatePassId : number) {
    this.gatePassClient.deleteAssetGatePass(this.gatePassId).subscribe(data => {
      this.responseMessage = data;      
      this.rowData = this.gatePassClient.getAllAssetGatePassList();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  openModalforApproveReject(template: TemplateRef<any>)
  {   
    this.modalRef = this.modalService.show(template);
  }

  UpdateGatePassStatus(gatePassStatus : string)
  {
    this.gatePassData.id = this.gatePassId;
    this.gatePassData.gatePassStatus.statusName = gatePassStatus;
    this.gatePassClient.updateGatePassStatus(this.gatePassData).subscribe( data => {
      this.responseMessage = data;
      this.closeForm() 
    },
    error => {
      this.responseMessage = error;
    })
  }

  openModalForEdit() {
    const initialState = {
      assetGatePassModel: {}
    };

    this.gatePassClient.getGatePassDetailById(this.gatePassId).subscribe(
      data => {
        initialState.assetGatePassModel = data;
        this.modalRef = this.modalService.show(EditAssetGatePassComponent, { class: 'modal-lg', initialState });
       // this.modalRef.content.closeBtnName = 'Close';
        this.modalRef.content.pevent.subscribe(data => {
          this.getAllAssetGatePassList();
        });


      },
      error => {
        initialState.assetGatePassModel = error.error;
      }
    );
  }

  openModalWithComponent() {
    const initialState = {
      gatePassData : <any>{}

    };

    this.gatePassClient.getGatePassDetailById(this.gatePassId).subscribe(
      data => {
        initialState.gatePassData = data;
        this.modalRef = this.modalService.show(ViewAssetGatePassComponent, { class: 'modal-lg', initialState });
        this.modalRef.content.pevent.subscribe(data => {
          this.getAllAssetGatePassList();
        });
      },
      error => {
        initialState.gatePassData = error.error;
      }
    );
  }

  onPageSizeChanged(newPageSize) {
    const value = (<HTMLInputElement>document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.getAllAssetGatePassList();
  }

  getAllAssetGatePassList()
  {
    this.rowData = this.gatePassClient.getAllAssetGatePassList();
  }
  closeForm() {
    this.getAllAssetGatePassList();
    this.modalRef.hide();
  }

}
