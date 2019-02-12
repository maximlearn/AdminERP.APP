import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetCategoryModel, ResponseModel, AssetCategoryClient } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent implements OnInit {
  assetCategory: AssetCategoryModel = <AssetCategoryModel>{ id : 0 };
  responseMessage: ResponseModel;
  @ViewChild('assetCategoryfrm') assetCategoryfrm: NgForm;
  assetCategoryId: number;
  private gridApi; 
  rowData: any;
  isSaveDisplay : string = "visible"; 
  paginationPageSize : number;
  paginationNumberFormatter : any;
  

  columnDefs = [
    {
      headerName: "Action",
      template:
        "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit'><i data-action-type='edit' class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' data-action-type='delete'><i  data-action-type='delete' class='fa fa-trash-o fa-fw'></i></a>",
      width: 120
    },
    {
      headerName: "Asset Category Name", cellRenderer: function (params) {
        return params.data.categoryName ;
      },width : 400
    }
  ];


  constructor(private assetCategoryClient: AssetCategoryClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.assetCategoryId = e.data.id;
      this.isSaveDisplay  ="visible";
      this.responseMessage= null;

      switch (actionType) {
        case "view":
         return this.ViewAssetCategory(e.data);
        case "edit":
          return this.assetCategory = e.data;
        case 'delete':
         return this.deleteAssetCategory(this.assetCategoryId);
      }
    }
  }

  ViewAssetCategory(assetCategory : AssetCategoryModel)
  {
    this.responseMessage =null;
    this.assetCategory = assetCategory;
    this.isSaveDisplay  ="hidden";
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.assetCategoryClient.getAllAssetCategory();
  }


  deleteAssetCategory(assetCategoryId: number) {
    this.assetCategoryClient.deleteAssetCategory(assetCategoryId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.assetCategoryClient.getAllAssetCategory();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }
 
  SaveAssetCategory(assetCategory: AssetCategoryModel) {
    this.assetCategoryClient.saveAssetCategory(assetCategory).subscribe(data => {
      this.responseMessage = data;      
      this.rowData =this.assetCategoryClient.getAllAssetCategory();
      this.assetCategory = <AssetCategoryModel>{ id : 0 };
      this.assetCategoryfrm.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
   // this.userForm.reset();
    this.assetCategory = <AssetCategoryModel>{ id : 0 };
    this.assetCategoryfrm.controls['asset_Category'].markAsUntouched();
    this.responseMessage = null;
    this.isSaveDisplay  ="visible";
  }
}
