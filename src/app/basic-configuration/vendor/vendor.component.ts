import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorModel, ResponseModel, VendorClient } from 'src/app/sharedservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendor: VendorModel = <VendorModel>{ id : 0 };
  responseMessage: ResponseModel;
  @ViewChild('vendorform') vendorform: NgForm;
  departmentId: number;
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
      headerName: "Vendor Name", cellRenderer: function (params) {
        return params.data.vendorName ;
      },width : 400
    }
  ];


  constructor(private vendorClient: VendorClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute("data-action-type");
      this.departmentId = e.data.id;
      this.isSaveDisplay  ="visible";
      this.responseMessage= null;

      switch (actionType) {
        case "view":
         return this.ViewVendor(e.data);
        case "edit":
          return this.vendor = e.data;
        case 'delete':
         return this.deleteVendor(this.departmentId);
      }
    }
  }

  ViewVendor(vendor : VendorModel)
  {
    this.responseMessage =null;
    this.vendor = vendor;
    this.isSaveDisplay  ="hidden";
   
  }

  onPageSizeChanged(newPageSize: number) {
    const value = (<HTMLInputElement>document.getElementById("page-size"))
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.vendorClient.getAllVendor();
  }


  deleteVendor(vendorId: number) {
    this.vendorClient.deleteVendor(vendorId).subscribe(data => {
      this.responseMessage = data;
      this.rowData = this.vendorClient.getAllVendor();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }
 
  SaveVendor(vendor: VendorModel) {
    this.vendorClient.saveVendor(vendor).subscribe(data => {
      this.responseMessage = data;      
      this.rowData = this.vendorClient.getAllVendor();
      this.vendor = <VendorModel>{ id : 0 };
      this.vendorform.reset();
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  resetForm() {
   // this.userForm.reset();
    this.vendor = <VendorModel>{ id : 0 };
    this.vendorform.controls['vendorName'].markAsUntouched();
    this.responseMessage = null;
    this.isSaveDisplay  ="visible";
  }

}
