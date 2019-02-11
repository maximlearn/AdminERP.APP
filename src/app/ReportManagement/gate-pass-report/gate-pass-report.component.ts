import { Component, OnInit } from '@angular/core';
import { ReportClient, AssetGatePassClient, GatePassTypeModel, StatusModel } from 'src/app/sharedservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gate-pass-report',
  templateUrl: './gate-pass-report.component.html',
  styleUrls: ['./gate-pass-report.component.scss']
})

export class GatePassReportComponent implements OnInit {
  paginationPageSize: number;
  paginationNumberFormatter: any;
  private gridApi;
  rowData: any;
  gatePassTypeList: GatePassTypeModel[];
  gatePassStatusList: StatusModel[];
  gatePassStatusSelected: Array<any> = [];
  gatePassTypeSelected: Array<any> = [];
  reportType : string = "Summary";
  columnDefs : any;

  constructor(private reportClient: ReportClient, private gatePassClient: AssetGatePassClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };

    this.gatePassClient.getAllGatePassType().subscribe(data => { this.gatePassTypeList = data; });
    this.reportClient.getAllGatePassStatus().subscribe(data => { this.gatePassStatusList = data; })

  }


  onTypeChange(typeId: number, isChecked: boolean) {
    if (isChecked) {
      this.gatePassTypeSelected.push(typeId);
    } else {
      this.gatePassTypeSelected = this.gatePassTypeSelected.filter(x => x != typeId);
    }
    console.log(this.gatePassTypeSelected);
  }

  onStatusChange(statusId: number, isChecked: boolean) {
    if (isChecked) {
      this.gatePassStatusSelected.push(statusId);
    } else {
      this.gatePassStatusSelected = this.gatePassStatusSelected.filter(x => x != statusId);
    }
    console.log(this.gatePassStatusSelected);
  }

  columnSummaryDefs = [
    // tslint:disable-next-line:max-line-length
    { headerName: '#', valueGetter: 'node.rowIndex+1', width: 50 },
    { headerName: 'Gate Pass No', field: 'gatePassNo', width: 120 },
    {
      headerName: 'Gate Pass Date', cellRenderer: function (params) {
        return (params.data.gatePassDate === undefined) ? '' : new DatePipe('en-US').transform(params.data.gatePassDate, 'dd/MM/yyyy')
      }, width: 135
    },
    { headerName: 'Type', field: 'gatePassType.typeName', width: 100 },
    { headerName: 'Status', field: 'gatePassStatus.statusName', width: 80 },
    {
      headerName: 'Send To', cellRenderer: function (params) {
        return params.data.assetGatePassSenderDetail[0].name
      }, width: 100
    },
    {
      headerName: 'Send Address', cellRenderer: function (params) {
        return params.data.assetGatePassSenderDetail[0].companyName + ' , ' + params.data.assetGatePassSenderDetail[0].address +
          ' , ' + params.data.assetGatePassSenderDetail[0].phone + ((params.data.assetGatePassSenderDetail[0].email != null) ? ',' + params.data.assetGatePassSenderDetail[0].email : '');
      }, width: 150
    },
    {
      headerName: 'Items', cellRenderer: function (params) {
        return params.data.assetGatePassDetail.length
      }, width: 75
    },
    {
      headerName: 'Prepared By', cellRenderer: function (params) {
        return params.data.createdByNavigation.firstName + ' ' + params.data.createdByNavigation.lastName;
      }, width: 120
    },
    {
      headerName: 'Received By', cellRenderer: function (params) {
        return params.data.receivedByNavigation.firstName + ' ' + params.data.receivedByNavigation.lastName;
      }, width: 120
    }
   
  ]

  columnDetailDefs = [
    // tslint:disable-next-line:max-line-length
    { headerName: '#', valueGetter: 'node.rowIndex+1', width: 50 },
    { headerName: 'Gate Pass No', field: 'gatePassNo', width: 120 },
    {
      headerName: 'Gate Pass Date', cellRenderer: function (params) {
        return (params.data.gatePassDate === undefined) ? '' : new DatePipe('en-US').transform(params.data.gatePassDate, 'dd/MM/yyyy')
      }, width: 135
    },
    { headerName: 'Status', cellRenderer: function (params) {
      return params.data.gatePassStatus;
    }, width: 80 },
    { headerName: 'Type', cellRenderer: function (params) {
      return params.data.gatePassType;
    }, width: 100 },
    {
      headerName: 'Send To', cellRenderer: function (params) {
        return params.data.senderName
      }, width: 100
    },
    {
      headerName: 'Send Address', cellRenderer: function (params) {
        return params.data.sendAddress;
      }, width: 150
    },
    {
      headerName: 'Asset Tag Id', cellRenderer: function (params) {
        return params.data.assetTagId
      }, width: 120
    },
    {
      headerName: 'Asset Name', cellRenderer: function (params) {
        return params.data.assetName
      }, width: 120
    },
    {
      headerName: 'Asset Category', cellRenderer: function (params) {
        return params.data.assetCategoryName
      }, width: 140
    },
    {
      headerName: 'Prepared By', cellRenderer: function (params) {
        return params.data.createdBy ;
      }, width: 120
    },
    {
      headerName: 'Received By', cellRenderer: function (params) {
        return params.data.receivedBy;
      }, width: 120
    }
    
    
  ]

  onGridReady(params) {
    this.gridApi = params.api;   
    this.columnDefs = this.columnSummaryDefs ;
      this.rowData = this.reportClient.getGatePassSummaryReport();
  

  }

  GetReportData()
  {
    if (this.reportType == "Summary")
    { this.columnDefs = this.columnSummaryDefs ;
      this.rowData = this.reportClient.getGatePassSummaryReport();}
    else 
    {this.columnDefs = this.columnDetailDefs;
      this.rowData = this.reportClient.getGatePassReportWithItems();
    }

  }

}
