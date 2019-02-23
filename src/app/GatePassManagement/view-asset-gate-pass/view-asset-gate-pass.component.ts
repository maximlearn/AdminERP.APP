import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { AssetGatePassModel, DocumentModel, AssetGatePassClient, ResponseModel } from 'src/app/sharedservice';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-view-asset-gate-pass',
  templateUrl: './view-asset-gate-pass.component.html',
  styleUrls: ['./view-asset-gate-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAssetGatePassComponent implements OnInit {
  title: string;
  closeBtnName: string;
  gatePassData: AssetGatePassModel;
  assetImage: DocumentModel; 
  isPDFDownload: boolean = false;
  gatePassStatus : string;
  responseMessage: ResponseModel;
  public modalRef: BsModalRef = new BsModalRef();


  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService,private gatePassClient: AssetGatePassClient) { }

  ngOnInit() {
    this.assetImage = this.gatePassData.company
  }

  openModalforApproveReject(gatePassStatus: string,template: TemplateRef<any>)
  {   this.gatePassStatus=gatePassStatus;
    this.modalRef = this.modalService.show(template);
  }

  UpdateGatePassStatus(gatePassId: number,gatePassStatus : string)
  {
    this.gatePassData.id = gatePassId;
    this.gatePassData.gatePassStatus.statusName = gatePassStatus;
    this.gatePassClient.updateGatePassStatus(this.gatePassData).subscribe( data => {
      this.responseMessage = data;
      this.modalRef.hide();
    },
    error => {
      this.responseMessage = error;
    })
  }

 
  pdfDownload() {
    this.isPDFDownload=true;
    setTimeout( () => { 
    
      var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options 
      var imgWidth = 208;
      var pageHeight = 135;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
 
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
      var position = 25;
     // pdf.setFontSize(22);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); 
      this.isPDFDownload=false;
    //  this.isPDFDownload=false;
      // Generated PDF  
    }); }, 0 );
   
   
   }
 
 
  

}

