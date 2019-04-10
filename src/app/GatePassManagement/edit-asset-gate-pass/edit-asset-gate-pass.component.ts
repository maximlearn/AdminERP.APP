import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { AssetGatePassClient, AssetGatePassModel, AssetGatePassDetailModel, AssetGatePassSenderDetailModel, QuantityUnitModel, AssetClient, AssetModel, AssetDetailModel, ResponseModel, GatePassTypeModel, UserModel } from 'src/app/sharedservice';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/common-service.service';


@Component({
  selector: 'app-edit-asset-gate-pass',
  templateUrl: './edit-asset-gate-pass.component.html',
  styleUrls: ['./edit-asset-gate-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditAssetGatePassComponent implements OnInit {
  title: string;
  closeBtnName: string;
  assetGatePassModel: AssetGatePassModel;
  assetGatePassDetailModel: AssetGatePassDetailModel;
  blanAssetGatePassDetailModel: AssetGatePassDetailModel;
  datePickerConfig: Partial<BsDatepickerConfig>;
  gatePassTypeList: GatePassTypeModel[];
  quantityUnitList: QuantityUnitModel[];
  errorMessage: string;
  assetModelList: AssetModel[];
  assetId: number = undefined;//= <AssetModel>{ assetDetail : [{}] }  
  defaultAssetId: number = undefined;
  @ViewChild('gatePassForm') gatePassForm: NgForm;
  responseMessage: ResponseModel;
  isAssetEdit: boolean = false;
  isValidQty: boolean = false;
  userData: UserModel;

  @Output() pevent: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private gatePassClient: AssetGatePassClient,
     private assetClient: AssetClient,private commonService: CommonService) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });
    //this.assetGatePassDetailModel = this.getDefaultGatePassDetailModel();
   // this.assetGatePassModel.createdByNavigation.firstName
    
  }

  ngOnInit() {
    console.log(this.assetGatePassModel);
    this.gatePassClient.getBlankGatePassDetail().subscribe( data => {this.blanAssetGatePassDetailModel = data;this.assetGatePassDetailModel=data;  console.log(this.assetGatePassDetailModel);});
    this.gatePassClient.getAllGatePassType().subscribe(data => { this.gatePassTypeList = data;this.gatePassTypeList = this.gatePassTypeList.filter(x => x.typeName != 'All'); });
    this.gatePassClient.getAllUnit().subscribe(data => { this.quantityUnitList = data; });
    this.assetClient.getAllAssetTag().subscribe(data => { this.assetModelList = data; console.log(this.assetModelList); });
    this.userData = this.commonService.GetUserData();
  }

  get createdUserName()
  { 
     return  this.assetGatePassModel.createdByNavigation.firstName + ', ' +   this.assetGatePassModel.createdByNavigation.lastName;}
  
  
     

  get selectedAsset() {
    return this.assetId;
  }
  set selectedAsset(value) {
    this.assetId = value;
  }

  SetAssetDetail(assetId: number) {
    this.assetGatePassDetailModel.asset = this.assetModelList.filter(x => x.id == assetId)[0];
  }

  SaveAssetGatePass(assetGatePassModel: any) {
  
    assetGatePassModel.createdBy = this.userData.id;
    this.gatePassClient.saveAssetGatePass(assetGatePassModel).subscribe(data => {
      this.responseMessage = data; console.log(this.responseMessage)
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  getDefaultGatePassDetailModel(): AssetGatePassDetailModel {
    return <AssetGatePassDetailModel>{
      asset: <AssetModel>{ assetDetail: [{}] },
      sendQtyUnit: <QuantityUnitModel>{},      
      assetType: <GatePassTypeModel>{},

    }
  }

  updateQuantityModel() {
    if ((this.assetGatePassDetailModel.sendQty || this.assetGatePassDetailModel.receivedQty))
      this.isValidQty = true;
    else
      this.isValidQty = false;
  }

  addAsset() {   
    this.errorMessage = null;
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.assetTagId === this.assetGatePassDetailModel.asset.assetTagId)
    if (!isAssetExist) {     
      
       this.assetGatePassDetailModel.assetType = this.gatePassTypeList.filter(x => x.id == this.assetGatePassDetailModel.assetTypeId)[0];
       this.assetGatePassDetailModel.sendQtyUnit = this.quantityUnitList.filter(x => x.id == this.assetGatePassDetailModel.sendQtyUnitId)[0];
     
      this.assetGatePassModel.assetGatePassDetail.push(this.assetGatePassDetailModel);
      this.resetAsset();

    }
    else {
      this.errorMessage = "Asset already added. Please add another one."
    }
  }


  updateAsset(assetId: number) {
    this.errorMessage = null;
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.id === assetId);
    if (isAssetExist) {
      let assetGatePassDetail: AssetGatePassDetailModel = this.assetGatePassModel.assetGatePassDetail.find(x => x.asset.id === assetId)[0]
      let index = this.assetGatePassModel.assetGatePassDetail.indexOf(assetGatePassDetail);
      this.assetGatePassDetailModel.assetType = this.gatePassTypeList.filter(x => x.id == this.assetGatePassDetailModel.assetTypeId)[0];
      this.assetGatePassDetailModel.sendQtyUnit = this.quantityUnitList.filter(x => x.id == this.assetGatePassDetailModel.sendQtyUnitId)[0];
      this.assetGatePassModel.assetGatePassDetail[index].sendQty = (this.assetGatePassDetailModel.sendQty != undefined) ? this.assetGatePassDetailModel.sendQty : null;
      this.assetGatePassModel.assetGatePassDetail[index].receivedQty = (this.assetGatePassDetailModel.receivedQty != undefined) ? this.assetGatePassDetailModel.receivedQty : null;
      this.assetGatePassModel.assetGatePassDetail[index].assetType = this.assetGatePassDetailModel.assetType;
      this.assetGatePassModel.assetGatePassDetail[index].sendQtyUnit = this.assetGatePassDetailModel.sendQtyUnit;
      this.resetAsset();
    }
    else {
      this.errorMessage = "Some error occured during update."
    }
  }

  deleteAsset(assetId: number) {
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.id === assetId)
    if (isAssetExist) {
      this.assetGatePassModel.assetGatePassDetail = this.assetGatePassModel.assetGatePassDetail.filter(x => x.asset.id != assetId)
      this.errorMessage = "Asset remove from the list."
      this.resetAsset();
    }
  }

  editAsset(assetId: number) {
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.id === assetId)
    if (isAssetExist) {
      let assetGatePassDetailModel: AssetGatePassDetailModel[] = this.assetGatePassModel.assetGatePassDetail.filter(x => x.asset.id === assetId) //this.assetGatePassModel.assetGatePassDetail.map(x => Object.assign({}, x));
      this.assetGatePassDetailModel = assetGatePassDetailModel.filter(x => x.asset.id === assetId)[0];
      this.selectedAsset = this.assetGatePassDetailModel.asset.id;
      this.isAssetEdit = true;
      this.isValidQty = true;
    }
  }

  resetAsset() {
    this.assetGatePassDetailModel = this.blanAssetGatePassDetailModel;
    this.gatePassForm.controls['assetTagId'].markAsUntouched();
    this.gatePassForm.controls['sendqtyunits'].markAsUntouched();
    this.gatePassForm.controls['asset_status'].markAsUntouched();
    this.selectedAsset = this.defaultAssetId;
    this.isAssetEdit = false;
    this.errorMessage = null

  }

  resetForm() {
    this.assetGatePassModel.assetGatePassDetail = this.assetGatePassModel.assetGatePassDetail.filter(o => o.asset.assetTagId != undefined);
    this.assetGatePassModel.gatePassDate = new Date();
    this.assetGatePassModel.gatePassNo = "GP-11111";
    this.gatePassForm.controls['gatepass_status'].markAsUntouched();
    this.responseMessage = null;
  }

  closeForm() {
    this.pevent.emit({ data: "Parent Refreshed." });
    this.bsModalRef.hide();
  }

}
