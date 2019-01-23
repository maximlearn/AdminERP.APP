import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AssetComponent } from "../asset/asset.component";
import { AddAssetComponent } from "../add-asset/add-asset.component";
import { AssetClient } from "src/app/sharedservice";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-asset-list",
  templateUrl: "./asset-list.component.html",
  styleUrls: ["./asset-list.component.scss"]
})
export class AssetListComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild("template") inner;
  public paginationPageSize;
  public paginationNumberFormatter;
  private gridApi;
  private assetId: number;
  rowData: any;

  columnDefs = [
    // tslint:disable-next-line:max-line-length
    {
      headerName: "Action",
      template:
        "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit'><i data-action-type='edit' class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' data-action-type='delete'><i class='fa fa-trash-o fa-fw'></i></a>",
      width: 100
    },
    { headerName: "Asset Tag ID", field: "assetTagId", width: 150 },
    {
      headerName: "Asset Category Name",
      field: "assetCategory.categoryName",
      width: 150
    },
    { headerName: "Asset Name", field: "assetName", width: 150 },
    {
      headerName: "Cost",
      cellRenderer: function(params) {
        return params.data.assetDetail[0].cost;
      },
      width: 130
    },
    {
      headerName: "Purchase Date",
      cellRenderer: function(params) {
        return params.data.assetDetail[0].purchaseDate === undefined
          ? ""
          : new DatePipe("en-US").transform(
              params.data.assetDetail[0].purchaseDate,
              "dd/MM/yyyy"
            );
      },
      width: 160
    },
    {
      headerName: "Warranty Expire Date",
      cellRenderer: function(params) {
        return params.data.assetDetail[0].warrantyExpireDate === undefined
          ? ""
          : new DatePipe("en-US").transform(
              params.data.assetDetail[0].warrantyExpireDate,
              "dd/MM/yyyy"
            );
      },
      width: 200
    }
  ];

  constructor(
    private modalService: BsModalService,
    private assetClient: AssetClient
  ) {}

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "view":
          this.assetId = e.data.id;
          return this.openModalWithComponent();
        case "edit":
          this.assetId = e.data.id;
          return this.openModalForEdit();
        // case 'delete':
        //     this.assetId=e.data.id;
        //     return this.openModalWithComponent();
      }
    }
  }

  onPageSizeChanged(newPageSize) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.assetClient.getAllAsset();
  }

  openModalWithComponent() {
    const initialState = {
      assetData: {}
    };

    this.assetClient.getAssetById(this.assetId).subscribe(
      data => {
        initialState.assetData = data;
        this.modalRef = this.modalService.show(AssetComponent, {
          class: "modal-lg",
          initialState
        });
        this.modalRef.content.closeBtnName = "Close";
      },
      error => {
        initialState.assetData = error.error;
      }
    );
  }

  openModalForEdit() {
    const initialState = {
      assetData: {}
    };

    this.assetClient.getAssetById(this.assetId).subscribe(
      data => {
        initialState.assetData = data;
        this.modalRef = this.modalService.show(AddAssetComponent, {
          class: "modal-lg",
          initialState
        });
        this.modalRef.content.closeBtnName = "Close";
      },
      error => {
        initialState.assetData = error.error;
      }
    );
  }
}
