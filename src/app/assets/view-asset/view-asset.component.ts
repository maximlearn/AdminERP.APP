import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AssetModel, DocumentModel, AssetClient } from 'src/app/sharedservice';



@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss']
})

export class ViewAssetComponent implements OnInit {
  title: string;
  closeBtnName: string;
  assetData: AssetModel;
  assetImage : DocumentModel;
 

  constructor(public bsModalRef: BsModalRef,private assetClient: AssetClient) {
    console.log(this.assetData);
    // this.assetData=new IAssetModel();
  }

  ngOnInit() {
    console.log(this.assetData);
   this.assetImage = this.assetData.documentList.filter(x => x.fileLabel == "AssetImage")[0]
   //this.assetImage.fileImage
  }

  DownloadDocument(documentId : string) {
    this.assetClient.downloadDocument(documentId).subscribe(data =>  { this.downloadFile(data) })
    //alert(documentId);
  }

  downloadFile(data: DocumentModel) {
     const linkSource = 'data:'+data.fileType+';base64,' + data.fileImage;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = data.fileName;
        downloadLink.click();    
  }

}

