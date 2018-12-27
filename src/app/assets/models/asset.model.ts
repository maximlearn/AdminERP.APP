export class Asset {
    Id  : number;
   AssetTagId : string ;
    AssetName : string ;
     AssetCategoryId : number;
      AssetDescription : number;
      IsActive : boolean;
      CreatedBy : number;
      CreatedDate : Date;
      ModifiedBy : number ;
      ModifiedDate : Date;
      AssetCategoryModel : AssetCategory ;
      AssetDetailModel : AssetDetail;
      VendorModel  : Vendor;
}

export class AssetCategory {
     Id : number
     CategoryName : string
  
}

export class AssetDetail {
      Id : number;
          AssetId : number;
          PurchaseDate? : Date;
          VendorId? : number ;
          Cost? : number;
          WarrantyExpireDate? : Date;
          WarrantyDocumentId? : number;
          BrandName?: string;
          ModelNumber? : string;
          SerialNumber ? : string
  
}

export class Vendor {
      Id : number;
      VendorName  : string;
      IsActive? : boolean;
}
