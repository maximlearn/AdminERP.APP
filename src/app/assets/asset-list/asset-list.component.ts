import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { template } from '@angular/core/src/render3';

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
  constructor(private modalService: BsModalService) {
    this.paginationPageSize = 5;
    this.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }
  ngOnInit() {}

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
        let data = e.data;
        let actionType = e.event.target.getAttribute("data-action-type");

        switch(actionType) {
            case "view":
                return this.openModal(this.inner);
           
        }
    }
}

  columnDefs = [
    {headerName: '#', template:   "<a title='View' ><i data-action-type='view' class='fa fa-building fa-fw'></i></a>&nbsp;&nbsp;<a title='Edit' (click)='openModal(template)'><i class='fa fa-pencil-square-o fa-fw'></i></a>&nbsp;&nbsp;<a title='delete' (click)='openModal(template)'><i class='fa fa-trash-o fa-fw'></i></a>"
     ,width:100 },
    {headerName: 'Asset Tag ID', field: 'AssetTagId',width:150 },
    {headerName: 'Asset Category', field: 'AssetCategory',width:150 },
    {headerName: 'Asset Name', field: 'AssetName',width:150},
    {headerName: 'Cost', field: 'Cost',width:130},
    {headerName:'Purchase Date', field: 'PurchaseDate',width:160},
    {headerName: 'Warranty Expire Date', field: 'WarrantyExpireDate',width:228}];

    rowData = [
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
      { AssetTagId: 'Tag123', AssetCategory: 'Celica', AssetName: 'Chair' , 
      Cost: '45000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/01/2025' },
      { AssetTagId: 'Tag124', AssetCategory: 'Computer', AssetName: 'Table' , 
      Cost: '2000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/11/2022'},
      { AssetTagId: 'Tag125', AssetCategory: 'Laptop', AssetName: 'Bed' , 
      Cost: '1000', PurchaseDate: 'Celica', WarrantyExpireDate: '03/12/2020' },
  ];

  openModal(template : TemplateRef <any>) {    
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
