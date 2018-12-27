import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { template } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';
import { AssetsService } from '../assets.service';
import { Asset } from '../models/asset.model';
import { getViewData } from '@angular/core/src/render3/state';

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
      return params.data.assetDetail[0].purchaseDate;} , width: 160},
    {headerName: 'Warranty Expire Date',cellRenderer: function(params) {
      return params.data.assetDetail[0].warrantyExpireDate;} , width: 200}];

    rowData: any;
  constructor(private modalService: BsModalService,private http: HttpClient, private assetService : AssetsService) {}
  ngOnInit() {
   
     this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
        // let data = e.data;
        const actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
            case 'view':
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
  // this.gridColumnApi = params.columnApi;
  this.rowData=this.assetService.getAssetList();
  this.assetService.getAssetList().subscribe((data) =>{ console.log(data) } , (err) => { console.log(err)});
   
  // this.http
  //   .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
  //   .subscribe(data => {
  //     this.rowData = data;
  //     params.api.paginationGoToPage(4);
  //   });
}


  openModal(template : TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
