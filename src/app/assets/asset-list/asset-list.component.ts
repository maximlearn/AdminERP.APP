import { Component, OnInit, TemplateRef, ViewChild , Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { template } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';
import { AssetsService } from '../assets.service';
import { IAssetModel } from '../models/asset.model';
import { getViewData } from '@angular/core/src/render3/state';
import { Observable } from 'rxjs';
import { Template } from '@angular/compiler/src/render3/r3_ast';
//import { AssetClient,AssetModel } from 'src/app/auto.generated';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() assessData;
  @ViewChild('template') inner;
  private paginationPageSize;
  private paginationNumberFormatter;
  SERVER_URL = 'https://localhost:44361/api/';
  assetData: any;

  private gridApi;
  columnDefs = [
    // tslint:disable-next-line:max-line-length
    {headerName: 'Action', template: '<a title=\'View\' ><i data-action-type=\'view\' class=\'fa fa-building fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'Edit\' (click)=\'openModal(template)\'><i class=\'fa fa-pencil-square-o fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'delete\' (click)=\'openModal(template)\'><i class=\'fa fa-trash-o fa-fw\'></i></a>', width: 100 },
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
  //constructor(private modalService: BsModalService, private assetService : AssetsService, private swagassesstservice : AssetClient) {}

  constructor(private modalService: BsModalService, private assetService : AssetsService)  {}
  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
    return '[' + params.value.toLocaleString() + ']';
    };

    //this.assetData=new IAssetModel();
  }

  private assetId: number;
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
        let data = e.data;
        const actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
            case 'view':
                this.assetId=e.data.id;
                console.log(this.assetId);
                return this.openModal(this.inner);

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

  //swagassetData: Observable<AssetModel>;
  public myContent;
  openModal(template : TemplateRef <any>) {
   //this.swagassetData = this.swagassesstservice.getAssetById(this.assetId);
   this.assetService.getAssetById(this.assetId).subscribe(
    data => {
       this.assetData=data;
       this.modalRef = this.modalService.show(template, {initialState: this.assetData});
    },
    error => {
      this.assetData = error.error;
    }
  );

  //   this.assetService.(this.assetId)
  //   .subscribe(x => {
  //       this.assetData = x;
  //       console.log(x + ", : "+ this.assetData);
  //       //this.modalRef = this.modalService.show(template);
  // })

  // this.modalRef.  as TemplateRef
 // this.modalRef.content.myContent =this.swagassetData;
}
}
