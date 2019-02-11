import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportClient } from 'src/app/sharedservice';

@Component({
  selector: 'app-asset-report',
  templateUrl: './asset-report.component.html',
  styleUrls: ['./asset-report.component.scss']
})
export class AssetReportComponent implements OnInit {
  paginationPageSize : number;
  paginationNumberFormatter : any;
  private gridApi;
  rowData: any;
 
  constructor(private reportClient : ReportClient) { }

  ngOnInit() {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };

    this.rowData = this.reportClient.getGatePassSummaryReport();
  }

  columnDefs = [
    // tslint:disable-next-line:max-line-length
    { headerName: '#', template: '<a title=\'View\' ><i data-action-type=\'view\' class=\'fa fa-building fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'Edit\'><i data-action-type=\'edit\' class=\'fa fa-pencil-square-o fa-fw\'></i></a>&nbsp;&nbsp;<a title=\'delete\'><i data-action-type=\'delete\' class=\'fa fa-trash-o fa-fw\'></i></a>', width: 100 },
    { headerName: 'Gate Pass No', field: 'gatePassNo', width: 150 },
    {
      headerName: 'Gate Pass Date', cellRenderer: function (params) {
        return (params.data.gatePassDate === undefined) ? '' : new DatePipe('en-US').transform(params.data.gatePassDate, 'dd/MM/yyyy')
      }, width: 160
    },
    { headerName: 'Send To', cellRenderer: function (params) {
      return params.data.assetGatePassSenderDetail.name }, width: 150 },
    { headerName: 'Send Address', cellRenderer: function (params) {
      return params.data.assetGatePassSenderDetail.companyName + ' , ' + params.data.assetGatePassSenderDetail.address + 
      ' , ' + params.data.assetGatePassSenderDetail.phone + ' , ' + params.data.assetGatePassSenderDetail.email }, width: 150 },
    { headerName: 'Items', cellRenderer: function (params) {
      return params.data.assetGatePassDetail.length  }, width: 150 },
    {
      headerName: 'Prepared By', cellRenderer: function (params) {
        return params.data.createdByNavigation.firstName + ' ' + params.data.createdByNavigation.lastName;
      }, width: 150
    },
    {
      headerName: 'Received By', cellRenderer: function (params) {
        return params.data.receivedByNavigation.firstName + ' ' + params.data.receivedByNavigation.lastName;
      }, width: 150
    },
    { headerName: 'Type', field: 'gatePassType.typeName', width: 150 },
    { headerName: 'Status', field: 'gatePassStatus.statusName', width: 150 }   
  ]

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.reportClient.getGatePassSummaryReport();
  }


}
