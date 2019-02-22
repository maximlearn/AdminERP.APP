import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetGatePassClient, AssetGatePassModel,  AssetGatePassDetailModel, AssetGatePassSenderDetailModel, QuantityUnitModel, AssetClient, AssetModel, AssetDetailModel, ResponseModel, GatePassTypeModel, UserModel } from 'src/app/sharedservice';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/common-service.service';





@Component({
  selector: 'app-create-gate-pass',
  templateUrl: './create-gate-pass.component.html',
  styleUrls: ['./create-gate-pass.component.scss']
})
export class CreateGatePassComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  assetGatePassModel: AssetGatePassModel;
  assetGatePassDetailModel: AssetGatePassDetailModel;
  gatePassTypeList: GatePassTypeModel[];
  quantityUnitList: QuantityUnitModel[];
  errorMessage: string;
  assetModelList: AssetModel[];
  assetId: number = -101;//= <AssetModel>{ assetDetail : [{}] }  
  //defaultAssetId : number = undefined;
  @ViewChild('gatePassForm') gatePassForm: NgForm;
  responseMessage: ResponseModel;
  isAssetEdit: boolean = false;
  isValidQty: boolean = false;
  gatePassNo :string = "GP-XXXXXXXX";
  userData : UserModel;
  

  constructor(private gatePassClient: AssetGatePassClient, private assetClient: AssetClient,
    private commonService: CommonService) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY' });
    this.assetGatePassModel = this.getDefaultGatePassModel();
    this.assetGatePassDetailModel = this.getDefaultGatePassDetailModel();
    this.assetGatePassModel.assetGatePassDetail = this.assetGatePassModel.assetGatePassDetail.filter(o => o.asset.assetTagId != undefined);
    this.assetGatePassModel.gatePassDate = new Date();   
  }
  
  ngOnInit() {
    this.gatePassClient.getAllGatePassType().subscribe(data => { this.gatePassTypeList = data;this.gatePassTypeList = this.gatePassTypeList.filter(x => x.typeName != 'All'); });
    this.gatePassClient.getAllUnit().subscribe(data => { this.quantityUnitList = data; });
    this.assetClient.getAllAssetTag().subscribe(data => { this.assetModelList = data; });
    this.userData = this.commonService.GetUserData();
    console.log(this.userData);

  }

  get createdUserName()
  {  return this.userData.firstName + ', ' +  this.userData.lastName;}
  
  getDefaultGatePassModel(): AssetGatePassModel {
    return <AssetGatePassModel>{ gatePassTypeId : -101,
      assetGatePassDetail: [{
        asset: <AssetModel>{ assetDetail: [{}] }
      }],
      assetGatePassSenderDetail: [{}]
    };
  }

  getDefaultGatePassDetailModel(): AssetGatePassDetailModel {
    return <AssetGatePassDetailModel>{ assetTypeId : -101,sendQtyUnitId:-101,
      asset: <AssetModel>{ assetDetail: [{}] },
      sendQtyUnit: <QuantityUnitModel>{ },     
      assetType: <GatePassTypeModel>{}
    }
  }

  get selectedAsset() {
    return this.assetId;
  }
  set selectedAsset(value) {
    this.assetId = value;
  }

  SetAssetDetail(assetId: number) { 
    if (assetId !=-101)  
    this.assetGatePassDetailModel.asset = this.assetModelList.filter(x =>x.id == assetId)[0];
    else
    this.assetGatePassDetailModel.asset = <AssetModel>{ assetDetail : [{}]};

  }

  SaveAssetGatePass(assetGatePassModel: AssetGatePassModel) {
    assetGatePassModel.createdBy = this.userData.id;
    this.gatePassClient.saveAssetGatePass(assetGatePassModel).subscribe(data => {
      this.responseMessage = data;
      this.gatePassNo =  data.gatePassNo;
       console.log(this.responseMessage)
    },
      error => {
        this.responseMessage = error;
      }
    );
  }

  updateQuantityModel() {
    if ((this.assetGatePassDetailModel.sendQty || this.assetGatePassDetailModel.receivedQty))
       this.isValidQty=true;
       else 
       this.isValidQty =false;
  }

  addAsset() {
    let assetGatePassDetailModel: AssetGatePassDetailModel = this.getDefaultGatePassDetailModel();
    assetGatePassDetailModel = this.assetGatePassDetailModel;    
    this.errorMessage = null;
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.assetTagId === assetGatePassDetailModel.asset.assetTagId)
    if (!isAssetExist) {
      assetGatePassDetailModel.assetType = this.gatePassTypeList.filter(x=>x.id == assetGatePassDetailModel.assetTypeId)[0];
      assetGatePassDetailModel.sendQtyUnit = this.quantityUnitList.filter(x=>x.id == assetGatePassDetailModel.sendQtyUnitId)[0];
      this.assetGatePassModel.assetGatePassDetail.push(assetGatePassDetailModel);
      this.assetGatePassDetailModel = this.getDefaultGatePassDetailModel();
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
      let assetGatePassDetail: AssetGatePassDetailModel = this.assetGatePassModel.assetGatePassDetail.find(x => x.asset.id === assetId)
     
      let index = this.assetGatePassModel.assetGatePassDetail.indexOf(assetGatePassDetail); 
      this.assetGatePassDetailModel.assetType = this.gatePassTypeList.filter(x=>x.id == this.assetGatePassDetailModel.assetTypeId)[0];
      this.assetGatePassDetailModel.sendQtyUnit = this.quantityUnitList.filter(x=>x.id == this.assetGatePassDetailModel.sendQtyUnitId)[0];
      this.assetGatePassModel.assetGatePassDetail[index] = this.assetGatePassDetailModel;
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
    }
  }

  editAsset(assetId: number) {
    let isAssetExist: boolean =
      this.assetGatePassModel.assetGatePassDetail.some(x => x.asset.id === assetId)
    if (isAssetExist) {
      let assetGatePassDetailModel: AssetGatePassDetailModel[] = this.assetGatePassModel.assetGatePassDetail.map(x => Object.assign({}, x));
      this.assetGatePassDetailModel = assetGatePassDetailModel.filter(x => x.asset.id == assetId)[0];
      this.selectedAsset = assetId;     
      this.isAssetEdit = true;
    }
  }

  resetAsset() {
    this.assetGatePassDetailModel = this.getDefaultGatePassDetailModel();
    this.gatePassForm.controls['assetTagId'].markAsUntouched();
    this.gatePassForm.controls['sendqtyunits'].markAsUntouched();
    this.gatePassForm.controls['asset_status'].markAsUntouched();
    this.selectedAsset = -101;
    this.isAssetEdit = false;   
    this.errorMessage=null;
  }

  resetForm()
  {
    this.assetGatePassModel = this.getDefaultGatePassModel();   
    this.assetGatePassModel.assetGatePassDetail = this.assetGatePassModel.assetGatePassDetail.filter(o => o.asset.assetTagId != undefined);
    this.assetGatePassModel.gatePassDate = new Date();
    this.assetGatePassModel.gatePassNo = "GP-XXXXXXXX";
    this.gatePassForm.controls['gatepass_status'].markAsUntouched();
    this.responseMessage=null;
  }

}
