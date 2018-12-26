import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
API_URL = 'https://localhost:44361/api/';
  constructor(private httpClient: HttpClient) { }

public getAssetList() {
  return this.httpClient.get(this.API_URL + 'assetlist');
}

public getAsset(assetId) {
  return this.httpClient.get(`${this.API_URL + 'assetslist'}/${assetId}`);
}

public addAsset(asset: {assetTagId: string, assetName: string, assetCategory: string}) {
return this.httpClient.post (this.API_URL , 'asset');
}

}
