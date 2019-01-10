export class IAssetModel {
  id!: number;
  assetTagId?: string | undefined;
  assetName?: string | undefined;
  assetCategoryId!: number;
  assetDescription?: string | undefined;
  isActive!: boolean;
  createdBy!: number;
  createdDate!: Date;
  modifiedBy!: number;
  modifiedDate!: Date;
  assetCategory?: IAssetCategoryModel | undefined;
  assetDetail?: IAssetDetailModel[] | undefined;
  vendorModel  : IVendorModel;
  message :  string;
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
  id!: number;
  categoryName?: string | undefined;
  isActive?: boolean | undefined;
  createdBy!: number;
  createdDate!: Date;
  modifiedBy!: number;
  modifiedDate!: Date;
}

export class IAssetDetailModel {
  id!: number;
  assetId!: number;
  purchaseDate?: Date | undefined;
  vendorId?: number | undefined;
  cost?: number | undefined;
  warrantyExpireDate?: Date | undefined;
  warrantyDocumentId?: string | undefined;
  assetImageId?: string | undefined;
  brandName?: string | undefined;
  modelNumber?: string | undefined;
  serialNumber?: string | undefined;
  asset?: IAssetModel | undefined;
  vendor?: IVendorModel | undefined;
}

export class IVendorModel {
  id!: number;
  vendorName?: string | undefined;
  isActive?: boolean | undefined;
}

export class IMessage {
  message : string;
  isActive : boolean;
  isSuccess : boolean;
}

export class IResponseMessage {
  statusCode : number;
  statusText : string;
  message : string;
  isSuccess : boolean;
}
