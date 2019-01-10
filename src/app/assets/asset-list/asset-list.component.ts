import { Component, OnInit, TemplateRef, ViewChild , Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AssetsService } from '../assets.service';
import { IAssetModel } from '../models/asset.model';
import { Observable } from 'rxjs';
import { AssetComponent } from '../asset/asset.component';
import { AddAssetComponent } from '../add-asset/add-asset.component';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  modalRef: BsModalRef;

  @ViewChild('template') inner;
  private paginationPageSize;
  private paginationNumberFormatter;
  SERVER_URL = 'https://localhost:44361/api/';
 // assetData: any;

  private gridApi;
  columnDefs = [
    // tslint:disable-next-line:max-line-length
    {headerName: 'Action', template: '<a title=\'View\' ><i data-action-type=\'view\' class=\'fa fa-building fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'Edit\'><i data-action-type=\'edit\' class=\'fa fa-pencil-square-o fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'delete\' data-action-type=\'delete\'><i class=\'fa fa-trash-o fa-fw\'></i></a>', width: 100 },
    {headerName: 'Asset Tag ID', field: 'assetTagId', width: 150 },
    {headerName: 'Asset Category Name', field: 'assetCategory.categoryName', width: 150 },
    {headerName: 'Asset Name', field: 'assetName', width: 150},
    {headerName: 'Cost', cellRenderer: function(params) {
      return params.data.assetDetail[0].cost;}, width: 130},
    {headerName: 'Purchase Date',cellRenderer: function(params) {
      return (params.data.assetDetail[0].purchaseDate === null) ? '' : params.data.assetDetail[0].purchaseDate} , width: 160},
    {headerName: 'Warranty Expire Date',cellRenderer: function(params) {
      return params.data.assetDetail[0].warrantyExpireDate === null ? '' : params.data.assetDetail[0].warrantyExpireDate ;} , width: 200}];

    rowData: any;
  constructor(private modalService: BsModalService, private assetService : AssetsService)  {}
  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
    return '[' + params.value.toLocaleString() + ']';
    };
  }

  private assetId: number;
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
        const actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
            case 'view':
                this.assetId=e.data.id;
                return this.openModalWithComponent();
            case 'edit':
                this.assetId=e.data.id;
                return this.openModalForEdit();
            // case 'delete':
            //     this.assetId=e.data.id;
            //     return this.openModalWithComponent();
        }
        }
    }

onPageSizeChanged(newPageSize) {
  const value = (<HTMLInputElement>document.getElementById('page-size')).value;
  this.gridApi.paginationSetPageSize(Number(value));
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData=this.assetService.getAssetList();
}

//assetData : IAssetModel;
openModalWithComponent()
 {
   const initialState ={
     assetData : {}
    };

    this.assetService.getAssetById(this.assetId).subscribe(
    data => {

      initialState.assetData =  data;
       this.modalRef = this.modalService.show(AssetComponent, {class: 'modal-lg', initialState });
       this.modalRef.content.closeBtnName = 'Close';
    },
    error => {
      initialState.assetData = error.error;
    }
  );
}

openModalForEdit()
 {
   const initialState ={
     assetData : {}
    };

    this.assetService.getAssetById(this.assetId).subscribe(
    data => {

      initialState.assetData =  data;
       this.modalRef = this.modalService.show(AddAssetComponent, {class: 'modal-lg', initialState });
       this.modalRef.content.closeBtnName = 'Close';
    },
    error => {
      initialState.assetData = error.error;
    }
  );
}
}
