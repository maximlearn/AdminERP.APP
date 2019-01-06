export class IAssetModel {
  Id  : number;
  AssetTagId : string ;
  AssetName : string ;
  AssetCategoryId : number;
  AssetDescription : string;
  IsActive : boolean;
  CreatedBy : number;
  CreatedDate : Date;
  ModifiedBy : number ;
  ModifiedDate : Date;
  AssetCategory : IAssetCategoryModel ;
  AssetDetail : IAssetDetailModel[];
  VendorModel  : IVendorModel;
  Message :  string;
}

export class IFile implements File{
    lastModified: number;
    name: string;
    size: number;
    type: string;
    slice(start?: number, end?: number, contentType?: string): Blob {
        throw new Error("Method not implemented.");
    }
    filelabel : string;


}

export class IAssetCategoryModel {
  Id : number
  CategoryName : string
}

export class IAssetDetailModel {
  Id : number;
  AssetId : number;
  PurchaseDate? : Date;
  VendorId? : number ;
  Cost? : number;
  WarrantyExpireDate? : Date;
  WarrantyDocumentId? : string;
  AssetImageId? : string;
  BrandName?: string;
  ModelNumber? : string;
  SerialNumber ? : string
}

export class IVendorModel {
  Id : number;
  VendorName  : string;
  IsActive? : boolean;
}

export class IMessage {
    Message : string;
    IsActive : boolean;
    IsSuccess : boolean;
}

export class IResponseMessage
    {
        StatusCode : number;
        StatusText : string;
        Message : string;
        IsSuccess : boolean;
    }
